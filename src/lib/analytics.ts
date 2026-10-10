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

// In-memory debounce timestamp to prevent rapid double-taps
let lastClickTime = 0;

/**
 * Disparado ao clicar em qualquer botão do WhatsApp ou mensagem direta.
 * REGISTA EXATAMENTE 1 EVENTO "LEAD" NO META ADS COM VALOR MÁXIMO DE 55.000€,
 * COM DEDUPLICAÇÃO PERFEITA VIA EVENTID (SEM DUPLICAR EVENTOS NEM LINHAS NO SUPABASE).
 */
export function trackWhatsAppContact(source = 'whatsapp_cta', extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  if (now - lastClickTime < 2500) {
    return;
  }
  lastClickTime = now;

  const eventId =
    (extra.eventId as string) ||
    `wa_lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // 1. DISPARAR EXATAMENTE 1 ÚNICO EVENTO "LEAD" NO META PIXEL (55.000€)
  // Sem eventos paralelos como Contact ou CompleteRegistration que duplicam a contagem no Meta Ads!
  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      fbq(
        'track',
        'Lead',
        {
          content_name: 'Lead WhatsApp — Lote Quintãs 55.000€',
          content_category: 'Terrenos e Moradias Aveiro',
          content_type: 'product',
          contents: [{ id: 'lote_quintas_55k', quantity: 1, item_price: 55000 }],
          currency: 'EUR',
          value: 55000,
          lead_source: `WhatsApp (${source})`,
          status: 'Lead WhatsApp Confirmada',
        },
        { eventID: eventId }
      );

      console.log(`🎯 [Meta Pixel ${META_PIXEL_ID}] 1 LEAD Único WhatsApp registado (55.000€):`, {
        eventId,
        source,
        value: 55000,
        currency: 'EUR',
      });
    }
  } catch (err) {
    console.error('Erro ao disparar Lead WhatsApp no Meta Pixel:', err);
  }

  // 2. Tentar recuperar nome ou telemóvel apenas se já tiverem sido escritos no formulário
  const inputNome = (document.getElementById('t-nome') as HTMLInputElement | null)?.value?.trim();
  const inputTel = (document.getElementById('t-telemovel') as HTMLInputElement | null)?.value?.trim();
  const quandoLigar = (document.getElementById('t-quando-ligar') as HTMLInputElement | null)?.value?.trim() || undefined;
  const quandoVisitar = (document.getElementById('t-quando-visitar') as HTMLInputElement | null)?.value?.trim() || undefined;

  const nome = (extra.nome as string) || inputNome || `Interessado WhatsApp (${source})`;
  const telemovel = (extra.telemovel as string) || inputTel || 'Contacto direto WhatsApp';

  // 3. ENVIAR PARA /api/lead VIA 1 ÚNICO PEDIDO FETCH KEEPALIVE (sem duplicar com sendBeacon!)
  const fbp = getOrCreateFbp();
  const fbc = getOrCreateFbc();

  const leadPayload = {
    nome,
    telemovel,
    quandoLigar,
    quandoVisitar,
    mensagem: `Interessado clicou no botão WhatsApp (${source}) — Valor 55.000€.`,
    origem: `WhatsApp — ${source}`,
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
    }).catch(() => {});
  } catch {}

  trackEvent('whatsapp_click_contact', { source, eventId, nome, telemovel, value: 55000, ...extra });
}

// Inicializar listener global para captar links do WhatsApp e chamadas telefónicas
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
      } else if (href.startsWith('tel:')) {
        trackWhatsAppContact('chamada_telefonica_direta');
      }
    },
    { capture: true }
  );
}

export const trackWhatsAppLead = trackWhatsAppContact;
