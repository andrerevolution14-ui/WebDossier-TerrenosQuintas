'use client';

/**
 * Utilitário central de navegação rápida e suave para o formulário.
 * Garante que em qualquer dispositivo (desktop ou mobile), o ecrã desliza com precisão
 * cirúrgica até ao cartão do formulário (#formulario), ativa um destaque visual e
 * coloca o cursor no primeiro campo (Nome Completo).
 */
export function scrollToForm(e?: React.MouseEvent | Event) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof window === 'undefined') return;

  const formElement = document.getElementById('formulario') || document.getElementById('contacto');
  if (!formElement) {
    window.location.hash = '#formulario';
    return;
  }

  const isMobile = window.innerWidth < 768;
  const topPadding = isMobile ? 16 : 24;
  const targetY = window.pageYOffset + formElement.getBoundingClientRect().top - topPadding;

  window.scrollTo({
    top: Math.max(0, Math.round(targetY)),
    behavior: 'smooth',
  });

  // Fallback suave para garantir chegada ao destino em todos os browsers móveis
  setTimeout(() => {
    const currentRect = formElement.getBoundingClientRect();
    if (Math.abs(currentRect.top - topPadding) > 80) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 250);

  // Efeito visual sutil para orientar a atenção do utilizador
  formElement.classList.remove('t-form-highlight');
  void formElement.offsetWidth;
  formElement.classList.add('t-form-highlight');

  // Foco imediato no campo do nome sem saltos bruscos
  setTimeout(() => {
    const input = document.getElementById('t-nome') as HTMLInputElement | null;
    if (input) {
      input.focus({ preventScroll: true });
    }
  }, 400);
}
