'use client';

import { scrollToForm } from '@/lib/scrollToForm';

/**
 * Botão flutuante — leva SEMPRE diretamente ao formulário (#formulario).
 * (Antes abria o WhatsApp e tirava o visitante da página.)
 */
export default function TerrenosWhatsAppButton() {
  return (
    <div className="t-wa-floating-wrap" role="complementary" aria-label="Agendar visita ao terreno">
      <a
        href="#formulario"
        onClick={scrollToForm}
        className="t-wa-floating-btn"
        id="cta_floating_formulario"
        title="Agendar Visita ao Terreno"
      >
        <svg
          className="t-wa-floating-icon"
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="t-wa-floating-text">Agendar Visita</span>
      </a>
    </div>
  );
}
