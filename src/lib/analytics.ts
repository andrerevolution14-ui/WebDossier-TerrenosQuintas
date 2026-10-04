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

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// In-memory debounce timestamp to prevent rapid double-taps
let lastClickTime = 0;

/**
 * Disparado ao clicar em botão do WhatsApp.
 * DISPARA LEAD NO META PIXEL (55.000€) E GRAVA AUTOMATICAMENTE NO SUPABASE + META CAPI.
 */
export function trackWhatsAppContact(source = 'whatsapp_cta', extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  if (now - lastClickTime < 1500) {
    return;
  }
  lastClickTime = now;

  const eventId =
    (extra.eventId as string) ||
    `wa_lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // 1. DISPARAR EVENTO PADRÃO "LEAD" NO META PIXEL (Objetivo Máximo de Campanha)
  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      // Evento LEAD primordial
      fbq(
        'track',
        'Lead',
        {
          content_name: 'Lead WhatsApp — Lote Quintãs 55.000€',
          content_category: 'Terrenos Aveiro',
          currency: 'EUR',
          value: 55000,
          lead_source: `WhatsApp (${source})`,
          status: 'Lead WhatsApp Iniciada',
          ...extra,
        },
        { eventID: eventId }
      );

      // Evento secundário Contact para telemetria paralela
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
        { eventID: `${eventId}_contact` }
      );

      console.log(`🎯 [Meta Pixel ${META_PIXEL_ID}] LEAD WhatsApp registado como Objetivo Principal:`, {
        eventId,
        source,
        value: 55000,
      });
    } else {
      console.warn('[Meta Pixel] fbq ainda não disponível para disparo de WhatsApp Lead.');
    }
  } catch (err) {
    console.error('Erro ao disparar Lead WhatsApp no Meta Pixel:', err);
  }

  // 2. Tentar recuperar nome ou telemóvel já inseridos no formulário (caso tenha começado a preencher)
  const inputNome = (document.getElementById('t-nome') as HTMLInputElement | null)?.value?.trim();
  const inputTel = (document.getElementById('t-telemovel') as HTMLInputElement | null)?.value?.trim();

  const nome = (extra.nome as string) || inputNome || `Interessado WhatsApp (${source})`;
  const telemovel = (extra.telemovel as string) || inputTel || 'Contacto direto WhatsApp';

  // 3. PERSISTIR NO SUPABASE + META CAPI VIA /api/lead (com keepalive: true garantido)
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');

  const leadPayload = {
    nome,
    telemovel,
    origem: `WhatsApp — ${source}`,
    mensagem: `Interessado clicou no botão WhatsApp (${source}) para falar diretamente com o proprietário.`,
    eventId,
    fbp,
    fbc,
    url: window.location.href,
    isWhatsAppLead: true,
  };

  try {
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload),
      keepalive: true,
    })
      .then((res) => {
        if (res.ok) {
          console.log(`✅ [Supabase & CAPI] Lead WhatsApp (${source}) gravada com sucesso!`);
        } else {
          console.warn(`⚠️ [API Lead] Resposta não-200 para WhatsApp Lead:`, res.status);
        }
      })
      .catch((err) => {
        console.error('[API Lead] Erro na rede ao enviar Lead WhatsApp:', err);
      });
  } catch (err) {
    console.error('[API Lead] Falha ao despachar pedido de Lead WhatsApp:', err);
  }

  trackEvent('whatsapp_click_contact', { source, eventId, nome, telemovel, ...extra });
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
