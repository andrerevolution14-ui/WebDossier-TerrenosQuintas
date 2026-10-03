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
    property: 'Lote Quintãs Aveiro (55.000€)',
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
 * Regista o evento padrão "Lead" com valor de 55.000€ e deduplicação CAPI através de eventId.
 */
export function trackFormSubmissionLead(leadData: { nome?: string; telemovel?: string; eventId?: string }) {
  if (typeof window === 'undefined') return;

  const eventId = leadData.eventId || `lead_form_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      // 1. Objetivo mais alto no Meta Ads: LEAD (55.000€)
      fbq(
        'track',
        'Lead',
        {
          content_name: 'Lote de Terreno c/ Projeto Aprovado e IVA a 6% — Quintãs Aveiro',
          content_category: 'Terrenos e Moradias Aveiro',
          currency: 'EUR',
          value: 55000,
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
          value: 55000,
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

// In-memory debounce timestamp to prevent rapid double-taps
let lastClickTime = 0;

/**
 * Disparado ao clicar em botão do WhatsApp
 */
export function trackWhatsAppContact(source = 'whatsapp_cta', extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  if (now - lastClickTime < 2000) {
    return;
  }
  lastClickTime = now;

  const eventId = `wa_contact_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      fbq(
        'track',
        'Contact',
        {
          content_name: 'Contacto WhatsApp — Lote Quintãs 55.000€',
          content_category: 'Terrenos Aveiro',
          currency: 'EUR',
          value: 55000,
          source,
          ...extra,
        },
        { eventID: eventId }
      );

      console.log(`💬 [Meta Pixel] Contacto WhatsApp registado (Source: ${source})`);
    }
  } catch (err) {
    console.error('Erro ao disparar Contact no Meta Pixel:', err);
  }

  trackEvent('whatsapp_click_contact', { source, ...extra });
}

// Inicializar listener global para captar links do WhatsApp
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        const source = target.id || target.getAttribute('data-source') || 'wa_link';
        trackWhatsAppContact(source);
      }
    },
    { capture: true }
  );
}

export const trackWhatsAppLead = trackWhatsAppContact;
