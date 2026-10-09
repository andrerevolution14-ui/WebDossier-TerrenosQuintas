'use client';

import { useState, useEffect } from 'react';
import { scrollToForm } from '@/lib/scrollToForm';

/**
 * Popup de intenção de saída.
 * O botão leva SEMPRE diretamente ao formulário principal da página (#formulario),
 * em vez de abrir um mini-formulário dentro do popup.
 */
export default function TerrenosExitIntent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Se já foi mostrado nesta sessão, não voltar a incomodar
    if (sessionStorage.getItem('terrenos_exit_popup_seen')) {
      return;
    }

    let hasTriggered = false;

    const triggerPopup = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      sessionStorage.setItem('terrenos_exit_popup_seen', 'true');
      setIsOpen(true);
    };

    // 1. Detetor Desktop: Cursor do rato move-se em direção ao topo da janela (fechar/mudar de aba)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && e.relatedTarget === null) {
        triggerPopup();
      }
    };

    // 2. Detetor Mobile: Intenção de saída por scroll rápido para cima após ter lido mais de 25% da página
    let maxScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > maxScrollY) {
        maxScrollY = currentY;
      }
      // Se desceu mais de 600px e depois rolou repentinamente para o topo
      if (maxScrollY > 700 && currentY < 120 && !hasTriggered) {
        triggerPopup();
      }
    };

    // 3. Fallback de Tempo: 28 segundos para utilizadores móveis indecisos
    const timer = setTimeout(() => {
      if (window.scrollY > 400) {
        triggerPopup();
      }
    }, 28000);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Fechar ao pressionar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGoToForm = () => {
    setIsOpen(false);
    // Espera o popup desmontar para o scroll calcular a posição correta
    requestAnimationFrame(() => scrollToForm());
  };

  if (!isOpen) return null;

  return (
    <div
      className="t-exit-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="t-exit-modal">
        {/* Botão de Fechar */}
        <button
          type="button"
          className="t-exit-close-btn"
          onClick={handleClose}
          aria-label="Fechar janela"
        >
          ✕
        </button>

        <div className="t-exit-content">
          {/* Tag de Urgência Promo */}
          <div className="t-exit-badge-pill">
            <span className="t-exit-badge-dot" />
            <span>✨ Desconto de Interesse -4.000€ · Até 16 de Outubro</span>
          </div>

          {/* Título que vende o sonho */}
          <h3 id="exit-popup-title" className="t-exit-title">
            🏡 A sua moradia de sonho a 7 min de Aveiro — com desconto esta semana
          </h3>

          {/* Texto Descritivo */}
          <p className="t-exit-desc">
            Imagine acordar numa moradia moderna, com jardim privado e os seus filhos a brincar lá fora — tudo isto
            a <strong>7 min do Glicínias</strong>. O projeto já está aprovado. E esta semana, o terreno sai com
            <strong> -4.000€ de desconto</strong>: de 55.000€ por <strong>51.000€ (ainda negociável)</strong>.
          </p>

          {/* Checklist de Benefícios Visíveis */}
          <ul className="t-exit-checklist">
            <li>
              <span className="t-exit-check-icon">✨</span>
              <span><strong>-4.000€</strong> de desconto de interesse para reservas até 16 de Outubro.</span>
            </li>
            <li>
              <span className="t-exit-check-icon">💶</span>
              <span><strong>Poupe ~40.000€</strong> em impostos com IVA a 6% na construção.</span>
            </li>
            <li>
              <span className="t-exit-check-icon">🏡</span>
              <span>Projeto T3 aprovado incluído — <strong>comece a construir já</strong>.</span>
            </li>
          </ul>

          <div className="t-exit-cta-trigger-box">
            <p className="t-exit-cta-label">
              Deixe o seu contacto para ser contactado e saber mais
            </p>
            <a
              href="#formulario"
              id="cta_exit_intent_formulario"
              className="t-btn t-btn-cta t-btn-full t-exit-primary-btn"
              onClick={(e) => {
                e.preventDefault();
                handleGoToForm();
              }}
            >
              <span>📅 Quero Garantir o Desconto de -4.000€</span>
              <span className="t-btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
