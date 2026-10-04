import crypto from 'node:crypto';

export const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '979841341182458';
export const META_CAPI_ACCESS_TOKEN =
  process.env.META_ACCESS_TOKEN ||
  process.env.META_CAPI_ACCESS_TOKEN ||
  'EAAT9k03bEqsBSgjVoa82Fet3Yiurus5KtnXVbjnPh6eVD42uNpHjz4uJsZAgZCRYrg4jcPZBZCIXZBPbNrCdrMzKryYhF0c07LSM2qmkIBvJ2OpsgIigbbcBVLFByCi6d8ZALAg87QREmel4XtaTh75xWR60eKdNYeYjvkTdCZAp4jZCk0dGoJiFVJAxneHXYAZDZD';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * Normaliza número de telemóvel para formato internacional E.164 (sem '+')
 * Exemplo PT: "912 345 678" -> "351912345678"
 */
function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00351')) {
    digits = digits.slice(2);
  } else if (!digits.startsWith('351') && digits.length === 9) {
    digits = `351${digits}`;
  }
  return digits;
}

export interface MetaLeadPayload {
  eventId: string;
  nome: string;
  telemovel: string;
  sourceUrl?: string;
  clientIp?: string | null;
  clientUserAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
}

/**
 * Envia evento LEAD para a Meta Conversions API (CAPI) via Server-Side.
 * Garante deduplicação perfeita com o Meta Pixel do browser através do mesmo `eventId`.
 * Valor registado: 55.000€ (Objetivo de Valor Mais Alto).
 */
export async function sendMetaLeadConversion(data: MetaLeadPayload) {
  try {
    const { eventId, nome, telemovel, sourceUrl, clientIp, clientUserAgent, fbp, fbc } = data;

    const cleanPhone = (telemovel || '').trim();
    const isGenericPhone =
      !cleanPhone ||
      cleanPhone.toLowerCase().includes('whatsapp') ||
      cleanPhone.toLowerCase().includes('direto');

    const cleanName = (nome || '').trim();
    const isGenericName =
      !cleanName ||
      cleanName.toLowerCase().includes('whatsapp') ||
      cleanName.toLowerCase().includes('interessado');

    const userData: Record<string, unknown> = {};

    if (!isGenericPhone) {
      const normalizedPhone = normalizePhone(cleanPhone);
      if (normalizedPhone.length >= 9) {
        userData.ph = [sha256(normalizedPhone)];
      }
    }

    if (!isGenericName) {
      const firstName = cleanName.split(' ')[0] || cleanName;
      if (firstName.length >= 2) {
        userData.fn = [sha256(firstName)];
      }
    }

    if (clientIp && clientIp !== '::1' && clientIp !== '127.0.0.1' && !clientIp.startsWith('192.168.') && !clientIp.startsWith('10.')) {
      userData.client_ip_address = clientIp;
    }
    if (clientUserAgent) {
      userData.client_user_agent = clientUserAgent;
    }
    if (fbp) {
      userData.fbp = fbp;
    }
    if (fbc) {
      userData.fbc = fbc;
    }

    // A Meta CAPI exige que haja parâmetros de correspondência válidos
    const hasMatchParams = Boolean(
      (userData.ph && (userData.ph as string[]).length > 0) ||
      userData.fbp ||
      (userData.client_ip_address && userData.client_user_agent)
    );

    if (!hasMatchParams) {
      console.warn('[Meta CAPI ⚠️] Parâmetros de correspondência insuficientes para enviar via CAPI neste ambiente (o Pixel do browser já registou o evento).');
      return { success: false, skipped: true, reason: 'insufficient_match_keys' };
    }

    const isWhatsAppLead = isGenericPhone || (data.sourceUrl && data.sourceUrl.includes('whatsapp'));

    const eventPayload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: sourceUrl || 'https://terrenosaveiro.pt/terrenos',
          action_source: 'website',
          user_data: userData,
          custom_data: {
            currency: 'EUR',
            value: 55000,
            content_name: isWhatsAppLead
              ? 'Lead WhatsApp — Lote Quintãs 55.000€'
              : 'Lote de Terreno c/ Projeto Aprovado e IVA a 6% — Quintãs Aveiro',
            content_category: 'Terrenos e Moradias Aveiro',
            status: isWhatsAppLead ? 'Lead WhatsApp Direto' : 'Lead Confirmada com Número',
            lead_source: isWhatsAppLead ? 'WhatsApp Direto' : 'Formulário Web Principal',
          },
        },
      ],
      access_token: META_CAPI_ACCESS_TOKEN,
    };

    const res = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
    });

    const resData = await res.json();

    if (!res.ok || resData.error) {
      console.error('[Meta CAPI ❌] Erro ao enviar Lead para Meta Conversions API:', resData.error || resData);
      return { success: false, error: resData.error };
    }

    console.log(`[Meta CAPI 🚀] Lead enviado com sucesso para a API de Conversões (Pixel ${META_PIXEL_ID}):`, {
      eventId,
      value: 55000,
      currency: 'EUR',
      eventsReceived: resData.events_received,
      fbtraceId: resData.fbtrace_id,
    });

    return { success: true, data: resData };
  } catch (err) {
    console.error('[Meta CAPI ❌] Exceção na chamada da API de Conversões:', err);
    return { success: false, error: err };
  }
}
