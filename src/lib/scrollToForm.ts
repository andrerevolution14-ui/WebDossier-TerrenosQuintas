'use client';

let rafId: number | null = null;

const OFFSET = 16; // pequena margem acima do cartão do formulário
const DURATION = 420; // ms — rápido mas percetível

function getTarget(): HTMLElement | null {
  return document.getElementById('formulario') || document.getElementById('contacto');
}

function targetY(el: HTMLElement): number {
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - OFFSET);
}

/**
 * Utilitário central de navegação para o formulário.
 * Recalcula a posição do formulário em CADA frame, por isso aterra sempre no sítio certo
 * mesmo que imagens, vídeos ou o mapa carreguem durante o scroll (layout shift).
 * Faz ainda uma verificação final e corrige se a página tiver mudado depois.
 */
export function scrollToForm(e?: React.MouseEvent | Event) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof window === 'undefined') return;

  const formElement = getTarget();
  if (!formElement) {
    window.location.hash = '#formulario';
    return;
  }

  if (rafId !== null) cancelAnimationFrame(rafId);

  // O CSS global tem `scroll-behavior: smooth` no <html>, o que faria cada scrollTo
  // ser uma animação própria. Desligamos durante o scroll controlado por JS.
  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const startY = window.scrollY;
  const startTime = performance.now();

  const finish = () => {
    rafId = null;
    window.scrollTo(0, targetY(formElement));

    // Correção final: se algo carregou e empurrou o formulário, volta a alinhar.
    setTimeout(() => {
      const delta = Math.abs(formElement.getBoundingClientRect().top - OFFSET);
      if (delta > 4) window.scrollTo(0, targetY(formElement));
      root.style.scrollBehavior = '';
    }, 250);

    // Destaque visual
    formElement.classList.remove('t-form-highlight');
    void formElement.offsetWidth;
    formElement.classList.add('t-form-highlight');

    // Foco no input apenas em desktop (evita abrir teclado em mobile)
    if (window.innerWidth >= 768) {
      const input = document.getElementById('t-nome') as HTMLInputElement | null;
      input?.focus({ preventScroll: true });
    }
  };

  if (reduceMotion) {
    finish();
    return;
  }

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / DURATION);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const dest = targetY(formElement); // recalculado a cada frame
    window.scrollTo(0, startY + (dest - startY) * eased);
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      finish();
    }
  };

  rafId = requestAnimationFrame(step);
}
