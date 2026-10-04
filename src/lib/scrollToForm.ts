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
  // Margem superior limpa e milimétrica para o formulário ficar perfeitamente enquadrado no ecrã
  const topPadding = isMobile ? 18 : 28;
  const targetY = window.pageYOffset + formElement.getBoundingClientRect().top - topPadding;

  window.scrollTo({
    top: Math.max(0, Math.round(targetY)),
    behavior: 'smooth',
  });

  // Animação de pulso luminoso dourado para destacar imediatamente os campos
  formElement.classList.remove('t-form-highlight');
  void formElement.offsetWidth; // Forçar reflow
  formElement.classList.add('t-form-highlight');

  // Foco imediato no campo do nome sem saltos bruscos
  setTimeout(() => {
    const input = document.getElementById('t-nome') as HTMLInputElement | null;
    if (input) {
      input.focus({ preventScroll: true });
    }
  }, 400);
}
