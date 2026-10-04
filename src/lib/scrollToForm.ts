'use client';

/**
 * Utilitário central de navegação suave para o formulário.
 * Garante que em qualquer dispositivo (desktop ou mobile), o ecrã desliza com precisão
 * cirúrgica até ao cartão do formulário (#formulario), ativa um destaque visual e
 * coloca o cursor no primeiro campo (Nome Completo).
 */
export function scrollToForm(e?: React.MouseEvent | Event) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof window === 'undefined') return;

  const formElement = document.getElementById('formulario');
  if (!formElement) return;

  const isMobile = window.innerWidth < 768;
  const header = document.querySelector('.t-header') as HTMLElement | null;
  const headerHeight = header ? header.offsetHeight : 68;

  const rect = formElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const availableHeight = viewportHeight - headerHeight;

  // Em desktop, se o cartão couber com folga no ecrã abaixo do cabeçalho,
  // centra-o perfeitamente no espaço visível.
  // Em mobile ou ecrãs pequenos, dá um respiro de 22px abaixo do header fixo.
  let offsetFromHeader = isMobile ? 22 : 36;
  if (!isMobile && rect.height > 0 && rect.height < availableHeight - 60) {
    offsetFromHeader = Math.max(36, Math.floor((availableHeight - rect.height) / 2));
  }

  const targetY = window.pageYOffset + rect.top - headerHeight - offsetFromHeader;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: 'smooth',
  });

  // Animação de pulso luminoso dourado para indicar exatamente onde preencher
  formElement.classList.remove('t-form-highlight');
  void formElement.offsetWidth; // Forçar reflow
  formElement.classList.add('t-form-highlight');

  // Foco imediato no campo do nome sem saltos bruscos
  setTimeout(() => {
    const input = document.getElementById('t-nome') as HTMLInputElement | null;
    if (input) {
      input.focus({ preventScroll: true });
    }
  }, 480);
}
