import { NextResponse } from 'next/server';
import { saveLeadToSupabase } from '@/lib/supabase';
import { sendMetaLeadConversion } from '@/lib/metaConversions';

function parseCookie(cookieHeader: string, key: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${key}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nome,
      telemovel,
      mensagem,
      origem,
      eventId: clientEventId,
      fbp: clientFbp,
      fbc: clientFbc,
      url,
      isWhatsAppLead,
    } = body || {};

    const cleanNome =
      nome && typeof nome === 'string' && nome.trim()
        ? nome.trim()
        : isWhatsAppLead
        ? `Interessado WhatsApp (${origem || 'Direto'})`
        : '';

    const cleanTelemovel =
      telemovel && typeof telemovel === 'string' && telemovel.trim()
        ? telemovel.trim()
        : isWhatsAppLead
        ? 'Contacto direto WhatsApp'
        : '';

    if (!cleanNome) {
      return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 });
    }

    if (!cleanTelemovel) {
      return NextResponse.json({ error: 'Telemóvel é obrigatório.' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

    // Deduplication Event ID partilhado com o Meta Pixel do browser
    const eventId =
      clientEventId ||
      `${isWhatsAppLead ? 'wa_lead' : 'lead_srv'}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Headers & cookies para enriquecimento de Event Match Quality (EMQ) na Meta
    const cookieHeader = req.headers.get('cookie') || '';
    const rawIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      undefined;
    const clientIp =
      rawIp && rawIp !== '::1' && rawIp !== '127.0.0.1' && !rawIp.startsWith('192.168.') && !rawIp.startsWith('10.')
        ? rawIp
        : undefined;

    const clientUserAgent = req.headers.get('user-agent') || undefined;
    const fbp = clientFbp || parseCookie(cookieHeader, '_fbp');
    const fbc = clientFbc || parseCookie(cookieHeader, '_fbc');
    const sourceUrl = url || req.headers.get('referer') || 'https://terrenosaveiro.pt/terrenos';

    // 1. Gravar no Supabase (Project ID: zxwkviggbftqiqwnigjn)
    const supabaseRes = await saveLeadToSupabase({
      nome: cleanNome,
      telemovel: cleanTelemovel,
      origem: origem || (isWhatsAppLead ? 'WhatsApp Direto' : 'Dossier Terreno Quintãs, Aveiro'),
      mensagem: mensagem || (isWhatsAppLead ? 'Interessado iniciou contacto através do WhatsApp.' : ''),
      status: isWhatsAppLead ? 'whatsapp' : 'nova',
    });

    if (!supabaseRes.success) {
      console.warn('[Lead API] Supabase erro/aviso:', supabaseRes.error);
    }

    // 2. Disparo Meta Conversions API (CAPI) — Evento LEAD com o valor mais alto (55.000€)
    let metaResult = null;
    try {
      metaResult = await sendMetaLeadConversion({
        eventId,
        nome: cleanNome,
        telemovel: cleanTelemovel,
        sourceUrl,
        clientIp,
        clientUserAgent,
        fbp,
        fbc,
      });
    } catch (metaErr) {
      console.error('[Lead API] Erro ao enviar para Meta CAPI:', metaErr);
    }

    // 3. Telegram Bot (Server-side env vars ou fallback)
    const token = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    const isTokenValid = token && token !== 'SEU_BOT_TOKEN_AQUI' && token.length > 10;
    const isChatIdValid = chatId && chatId !== 'SEU_CHAT_ID_AQUI' && chatId.length > 3;

    if (isTokenValid && isChatIdValid) {
      const headerTitle = isWhatsAppLead
        ? '💬 <b>NOVA LEAD WHATSAPP TERRENO AVEIRO</b> 💬'
        : '🚨 <b>NOVA LEAD FORMULÁRIO TERRENO AVEIRO</b> 🚨';

      const text =
        `${headerTitle}\n\n` +
        `👤 <b>Nome:</b> ${cleanNome}\n` +
        `📞 <b>Contacto:</b> ${cleanTelemovel}\n` +
        `📅 <b>Data/Hora:</b> ${timestamp}\n` +
        (origem ? `📍 <b>Origem:</b> ${origem}\n` : '') +
        (mensagem ? `💬 <b>Mensagem:</b> ${mensagem}\n` : '') +
        `\n👉 <i>Responder rapidamente pelo WhatsApp ou Chamada</i>`;

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
          }),
        });

        if (!tgRes.ok) {
          const errData = await tgRes.text();
          console.error('[Lead API] Telegram send error:', errData);
        }
      } catch (tgErr) {
        console.error('[Lead API] Network error calling Telegram:', tgErr);
      }
    } else {
      console.log('[Lead API] Nova lead registada:', {
        tipo: isWhatsAppLead ? 'WhatsApp' : 'Formulário',
        nome: cleanNome,
        telemovel: cleanTelemovel,
        timestamp,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead registada com sucesso.',
      eventId,
      supabaseSaved: supabaseRes.success,
      metaSent: metaResult?.success || false,
    });
  } catch (error) {
    console.error('[Lead API] Error processing lead:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar contacto.' },
      { status: 500 }
    );
  }
}

