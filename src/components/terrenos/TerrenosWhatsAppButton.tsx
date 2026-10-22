'use client';

import { useState, useEffect } from 'react';
import { trackWhatsAppContact } from '@/lib/analytics';

const PHONE_NUMBER = '351920601070';
const DEFAULT_MESSAGE =
  'Olá André! Vi o lote de terreno em Quintãs (Aveiro) no site e gostaria de obter mais informações sobre o projeto, agendamento de visita e condições. Obrigado!';

const WA_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

export default function TerrenosWhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Verificar se o utilizador já fechou o balão nesta sessão
    try {
      if (sessionStorage.getItem('t_wa_tooltip_dismissed') === '1') {
        setIsDismissed(true);
        return;
      }
    } catch {}

    // Exibir o balão de boas-vindas após 2.2 segundos de navegação
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('t_wa_tooltip_dismissed', '1');
    } catch {}
  };

  const handleWhatsAppClick = () => {
    // 1. Telemetria e Meta Pixel / CAPI Tracking ao mesmo nível dos formulários (Lead 51.000€)
    trackWhatsAppContact('floating_whatsapp_btn', {
      channel: 'whatsapp_floating_corner',
      phone: '+351 920 601 070',
      property: 'Lote Quintãs Aveiro (51.000€)',
      message_intent: 'general_landing_objectives',
    });
  };

  return (
    <div
      className="t-wa-floating-wrap"
      role="complementary"
      aria-label="Contacto direto via WhatsApp"
    >
      {/* Balão Interativo de Boas-Vindas Aesthetic */}
      {showTooltip && !isDismissed && (
        <aside
          className="t-wa-tooltip"
          role="dialog"
          aria-label="Mensagem de apoio via WhatsApp"
        >
          <button
            type="button"
            className="t-wa-tooltip-close"
            onClick={handleDismissTooltip}
            aria-label="Fechar mensagem"
            title="Fechar"
          >
            ×
          </button>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="t-wa-tooltip-body"
          >
            <div className="t-wa-tooltip-header">
              <span className="t-wa-tooltip-avatar">
                <span className="t-wa-avatar-initials">AQ</span>
                <span className="t-wa-status-dot" aria-hidden="true" />
              </span>
              <div className="t-wa-tooltip-meta">
                <span className="t-wa-tooltip-name">André Queirós</span>
                <span className="t-wa-tooltip-status">Online · Resposta Rápida</span>
              </div>
            </div>

            <p className="t-wa-tooltip-msg">
              Olá! 👋 Tem dúvidas sobre o lote, projeto aprovado ou quer agendar visita? Fale comigo no WhatsApp.
            </p>

            <span className="t-wa-tooltip-action">
              <span>Iniciar conversa</span>
              <span className="t-wa-tooltip-arrow" aria-hidden="true">→</span>
            </span>
          </a>
        </aside>
      )}

      {/* Botão Flutuante Principal de WhatsApp Sempre Ativo */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="t-wa-floating-btn"
        id="t-floating-whatsapp-btn"
        title="Falar com André Queirós no WhatsApp (+351 920 601 070)"
        aria-label="Falar com André Queirós no WhatsApp (+351 920 601 070)"
      >
        {/* Efeito Radar / Onda Pulsante */}
        <span className="t-wa-floating-ring" aria-hidden="true" />

        {/* Ícone Oficial WhatsApp em SVG */}
        <span className="t-wa-icon-wrap" aria-hidden="true">
          <svg
            className="t-wa-floating-icon"
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="currentColor"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.37c.01-4.54 3.7-8.24 8.25-8.24m-2.83 3.37c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.62 1.11 2.8c.13.19 1.9 2.9 4.61 4.07.65.28 1.15.45 1.54.57.66.21 1.26.18 1.74.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33-.28-.14-1.63-.81-1.88-.9-.25-.09-.43-.14-.61.14-.18.27-.7 1.09-.86 1.27-.15.19-.31.21-.58.07-.28-.14-1.16-.43-2.21-1.36-.81-.73-1.36-1.63-1.51-1.9-.16-.28-.02-.43.12-.57.13-.13.29-.34.43-.5.14-.16.18-.27.28-.46.1-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.46-.61-.47h-.57z" />
          </svg>
        </span>

        {/* Grupo de Texto e Indicador Online */}
        <span className="t-wa-text-group">
          <span className="t-wa-label-title">Falar no WhatsApp</span>
          <span className="t-wa-label-sub">
            <span className="t-wa-sub-dot" aria-hidden="true" />
            <span>Online · Resposta Rápida</span>
          </span>
        </span>
      </a>
    </div>
  );
}
