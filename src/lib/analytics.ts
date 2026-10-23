/**
 * Telemetria, rastreio de conversões e integração com o Meta Pixel & Conversions API
 * Meta Pixel ID: 979841341182458
 */

export const META_PIXEL_ID = '979841341182458';

export interface TrackingEvent {
  event: string;
  property: string;
  timestamp: string;
  [key: string]: unknown;
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const eventData: TrackingEvent = {
    event: eventName,
    property: 'Lote Quintãs Aveiro (51.000€)',
    timestamp: new Date().toISOString(),
    ...payload,
  };

  console.log(`[Terrenos Analytics 📡] ${eventName}:`, eventData);

  try {
    const existing = JSON.parse(localStorage.getItem('terrenos_lead_events') || '[]');
    existing.push(eventData);
    localStorage.setItem('terrenos_lead_events', JSON.stringify(existing.slice(-60)));
  } catch {}

  try {
    window.dispatchEvent(new CustomEvent('terrenos_tracking', { detail: eventData }));
  } catch {}
}

/**
 * DISPARO DO OBJETIVO MAIS ALTO: Formulário Preenchido como LEAD no Meta Pixel.
 * Regista o evento padrão "Lead" com valor de 51.000€ e deduplicação CAPI através de eventId.
 */
export function trackFormSubmissionLead(leadData: { nome?: string; telemovel?: string; eventId?: string }) {
  if (typeof window === 'undefined') return;

  const eventId = leadData.eventId || `lead_form_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      // 1. Objetivo mais alto no Meta Ads: LEAD (51.000€)
      fbq(
        'track',
        'Lead',
        {
          content_name: 'Lote de Terreno c/ Projeto Aprovado e IVA a 6% — Quintãs Aveiro',
          content_category: 'Terrenos e Moradias Aveiro',
          currency: 'EUR',
          value: 51000,
          lead_source: 'Formulário Web Principal',
          status: 'Lead Confirmada com Número',
        },
        { eventID: eventId }
      );

      // 2. Evento secundário de registo completo
      fbq(
        'track',
        'CompleteRegistration',
        {
          content_name: 'Contacto e Telemóvel Confirmados no Site',
          currency: 'EUR',
          value: 51000,
          status: 'Sucesso',
        },
        { eventID: `${eventId}_registration` }
      );

      console.log(`🎯 [Meta Pixel ${META_PIXEL_ID}] LEAD Registado como Objetivo Mais Alto:`, {
        eventId,
        value: 55000,
        currency: 'EUR',
      });
    } else {
      console.warn(`⚠️ [Meta Pixel] fbq ainda não disponível para disparo de Lead (${META_PIXEL_ID}).`);
    }
  } catch (err) {
    console.error('Erro ao disparar Lead no Meta Pixel:', err);
  }

  trackEvent('meta_lead_form_submitted', {
    pixelId: META_PIXEL_ID,
    eventId,
    ...leadData,
  });
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Garante que o cookie _fbp existe para correspondência no Meta Conversions API.
 * Se ainda não tiver sido criado pelo script do Pixel, gera no formato padrão fb.1.{timestamp}.{random}.
 */
function getOrCreateFbp(): string {
  if (typeof document === 'undefined') return '';
  let fbp = getCookie('_fbp');
  if (!fbp) {
    fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1000000000)}`;
    try {
      document.cookie = `_fbp=${fbp};path=/;max-age=${60 * 60 * 24 * 90};SameSite=Lax`;
    } catch {}
  }
  return fbp;
}

/**
 * Extrai o parâmetro fbclid da URL (se o utilizador veio de um anúncio do Meta/Facebook/Instagram)
 * e assegura o cookie _fbc para matching com 100% de qualidade.
 */
function getOrCreateFbc(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  let fbc = getCookie('_fbc');
  if (!fbc && typeof window !== 'undefined') {
    try {
      const url = new URL(window.location.href);
      const fbclid = url.searchParams.get('fbclid');
      if (fbclid) {
        fbc = `fb.1.${Date.now()}.${fbclid}`;
        document.cookie = `_fbc=${fbc};path=/;max-age=${60 * 60 * 24 * 90};SameSite=Lax`;
      }
    } catch {}
  }
  return fbc;
}

/**
 * Cliques ou mensagens por WhatsApp não são guardados na base de dados
 * nem considerados Lead ou Contacto (sem tracking por solicitação explícita).
 */
export function trackWhatsAppContact(
  _source = 'whatsapp_cta',
  _extra: Record<string, unknown> = {}
) {
  // Sem gravação na base de dados, sem Meta Pixel, sem CAPI, sem tracking.
}

export const trackWhatsAppLead = trackWhatsAppContact;
