export const WA_PHONE_NUMBER = '351920601070';
export const WA_PHONE_DISPLAY = '+351 920 601 070';

// Mensagem pré-definida geral única, aberta e direta sobre o Terreno em Quintãs
export const WA_DEFAULT_PRESET_MESSAGE =
  'Olá André! Vi o lote de terreno em Quintãs (Aveiro) e gostaria de obter mais informações sobre o projeto. Podemos falar?';

/**
 * Constrói o link oficial universal do WhatsApp (api.whatsapp.com),
 * que no iOS, Android e no In-App Browser do Facebook/Instagram
 * ativa imediatamente o Universal Link para a App nativa do WhatsApp
 * sem os ecrãs intermédios de "Continuar para a conversa" ou "Descarregar WhatsApp".
 */
export function getWhatsAppDirectUrl(
  message: string = WA_DEFAULT_PRESET_MESSAGE,
  phone: string = WA_PHONE_NUMBER
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}

/**
 * Abre o WhatsApp garantindo a MAIOR taxa de conversão possível:
 * - Em Mobile / In-App Browser (Facebook/Instagram):
 *   Usa window.location.href em vez de window.open, permitindo ao sistema operativo
 *   abrir a app nativa do WhatsApp diretamente com a mensagem pré-preenchida,
 *   evitando popups bloqueados e separadores em branco.
 * - Em Desktop:
 *   Abre num novo separador limpo via WhatsApp Web.
 */
export function openWhatsAppDirect(
  message: string = WA_DEFAULT_PRESET_MESSAGE,
  phone: string = WA_PHONE_NUMBER
) {
  if (typeof window === 'undefined') return;

  const url = getWhatsAppDirectUrl(message, phone);

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent || ''
    ) ||
    (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 2);

  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
