import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, telemovel, mensagem, origem } = body || {};

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
      return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 });
    }

    if (!telemovel || typeof telemovel !== 'string' || !telemovel.trim()) {
      return NextResponse.json({ error: 'Telemóvel é obrigatório.' }, { status: 400 });
    }

    const cleanNome = nome.trim();
    const cleanTelemovel = telemovel.trim();
    const timestamp = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

    // Server-side env vars (or fallback to public vars if configured)
    const token = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    const isTokenValid = token && token !== 'SEU_BOT_TOKEN_AQUI' && token.length > 10;
    const isChatIdValid = chatId && chatId !== 'SEU_CHAT_ID_AQUI' && chatId.length > 3;

    if (isTokenValid && isChatIdValid) {
      const text =
        `🚨 <b>NOVA LEAD TERRENO AVEIRO (QUINTÃS)</b> 🚨\n\n` +
        `👤 <b>Nome:</b> ${cleanNome}\n` +
        `📞 <b>Telemóvel:</b> ${cleanTelemovel}\n` +
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
      console.log('[Lead API] Nova lead registada (Telegram não configurado ou em modo mock):', {
        nome: cleanNome,
        telemovel: cleanTelemovel,
        timestamp,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Contacto recebido com sucesso.',
    });
  } catch (error) {
    console.error('[Lead API] Error processing lead:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar contacto.' },
      { status: 500 }
    );
  }
}
