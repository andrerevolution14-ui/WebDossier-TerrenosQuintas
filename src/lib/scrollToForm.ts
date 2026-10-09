'use client';

let isScrolling = false;

/**
 * Utilitário central de navegação rápida e suave para o formulário.
 * Garante que em qualquer dispositivo (desktop ou mobile), o ecrã desliza com precisão
 * cirúrgica exatamente até ao topo do cartão do formulário (#formulario).
 */
export function scrollToForm(e?: React.MouseEvent | Event) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof window === 'undefined') return;

  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 400);

  const formElement = document.getElementById('formulario') || document.getElementById('contacto');
  if (!formElement) {
    window.location.hash = '#formulario';
    return;
  }

  // Scroll nativo direto e cirúrgico para o elemento
  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Destaque visual luminoso para focar a atenção do utilizador
  formElement.classList.remove('t-form-highlight');
  void formElement.offsetWidth;
  formElement.classList.add('t-form-highlight');

  // Apenas foca o input em desktop para não forçar abertura do teclado virtual em smartphones
  if (window.innerWidth >= 768) {
    setTimeout(() => {
      const input = document.getElementById('t-nome') as HTMLInputElement | null;
      input?.focus({ preventScroll: true });
    }, 450);
  }
}
