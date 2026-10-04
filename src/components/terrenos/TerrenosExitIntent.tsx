'use client';

import { useState, useEffect, useRef } from 'react';
import { trackFormSubmissionLead, trackWhatsAppContact } from '@/lib/analytics';
import { saveLeadToSupabase } from '@/lib/supabase';
import { scrollToForm } from '@/lib/scrollToForm';

const WA_PHONE = '351920601070';

function formatPhoneInput(val: string): string {
  const trimmed = val.trim();
  if (trimmed.startsWith('+')) {
    const raw = '+' + trimmed.slice(1).replace(/[^\d]/g, '');
    if (raw.startsWith('+351')) {
      const rest = raw.slice(4).replace(/\s/g, '');
      if (rest.length <= 3) return `+351 ${rest}`;
      if (rest.length <= 6) return `+351 ${rest.slice(0, 3)} ${rest.slice(3)}`;
      return `+351 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6, 9)}`;
    }
    return raw;
  }

  const digits = val.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
}

export default function TerrenosExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [nome, setNome] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

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
    let lastScrollY = window.scrollY;
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
      lastScrollY = currentY;
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
        handleClose();
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
    setTimeout(() => {
      scrollToForm();
    }, 120);
  };

  const handleRevealFields = () => {
    setShowFields(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNome = nome.trim();
    const cleanTelemovel = telemovel.trim();
    const digits = cleanTelemovel.replace(/\D/g, '');

    if (!cleanNome) {
      setErrorMessage('Por favor introduza o seu nome completo.');
      return;
    }

    if (digits.length < 9) {
      setErrorMessage('Por favor introduza um número válido (mínimo 9 dígitos).');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const eventId = `exit_lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    let saved = false;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: cleanNome,
          telemovel: cleanTelemovel,
          origem: 'Popup de Intenção de Saída (Exit Intent)',
          eventId,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      if (res.ok) {
        saved = true;
      }
    } catch {}

    // Fallback de segurança direto ao Supabase
    if (!saved) {
      try {
        const direct = await saveLeadToSupabase({
          nome: cleanNome,
          telemovel: cleanTelemovel,
          origem: 'Popup Exit Intent (Fallback Cliente)',
          mensagem: 'Capturado pelo popup de retenção',
          status: 'nova',
        });
        if (direct.success) saved = true;
      } catch {}
    }

    // Disparar Lead no Meta Pixel (55.000€)
    trackFormSubmissionLead({
      nome: cleanNome,
      telemovel: cleanTelemovel,
      eventId,
    });

    setStatus('success');
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

        {status === 'success' ? (
          <div className="t-exit-success">
            <div className="t-exit-success-icon">✓</div>
            <h3 className="t-exit-success-title">Contacto Confirmado!</h3>
            <p className="t-exit-success-text">
              Obrigado, <strong>{nome}</strong>. André Queirós irá ligar-lhe para o número{' '}
              <strong>{telemovel}</strong> ainda hoje para esclarecer todas as dúvidas sobre o terreno e o benefício do IVA a 6%.
            </p>
            <a
              href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                `Olá André! Deixei o meu contacto no popup (${nome} - ${telemovel}) sobre o terreno em Quintãs por 55.000€ e gostaria de falar agora.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-btn t-btn-cta t-btn-full"
              onClick={() =>
                trackWhatsAppContact('exit_popup_success_wa', {
                  nome,
                  telemovel,
                })
              }
            >
              <span>💬 Falar Já no WhatsApp</span>
              <span className="t-btn-arrow">→</span>
            </a>
          </div>
        ) : (
          <div className="t-exit-content">
            {/* Tag / Badge de Urgência */}
            <div className="t-exit-badge-pill">
              <span className="t-exit-badge-dot" />
              <span>Oportunidade Limitada · Quintãs, Aveiro</span>
            </div>

            {/* Título a Vermelho / Negrito conforme pedido */}
            <h3 id="exit-popup-title" className="t-exit-title">
              Vai mesmo esperar o preço subir a próxima semana?
            </h3>

            {/* Texto Descritivo */}
            <p className="t-exit-desc">
              Terreno urbano de 233m² por <strong>55.000€ (negociável)</strong>, a apenas{' '}
              <strong>7 min de Aveiro</strong> e <strong>5 min da A25</strong>. Com projeto de moradia moderna pago e aprovado.
            </p>

            {/* Checklist de Benefícios Visíveis */}
            <ul className="t-exit-checklist">
              <li>
                <span className="t-exit-check-icon">✅</span>
                <span><strong>Poupe até 40.000€</strong> em impostos (IVA a 6%).</span>
              </li>
              <li>
                <span className="t-exit-check-icon">✅</span>
                <span><strong>Zero anos de espera</strong> na Câmara (Projeto T3 incluído no preço de 55.000€).</span>
              </li>
              <li>
                <span className="t-exit-check-icon">✅</span>
                <span><strong>Melhor terreno</strong> da zona!</span>
              </li>
            </ul>

            {!showFields ? (
              <div className="t-exit-cta-trigger-box">
                <p className="t-exit-cta-label">
                  Deixe o seu contacto para ser contactado e saber mais
                </p>
                <button
                  type="button"
                  id="cta_exit_intent_open_fields"
                  className="t-btn t-btn-cta t-btn-full t-exit-primary-btn"
                  onClick={handleRevealFields}
                >
                  <span>Quero Ser Contactado e Saber Mais</span>
                  <span className="t-btn-arrow">→</span>
                </button>
                <button
                  type="button"
                  onClick={handleGoToForm}
                  className="t-exit-skip-to-form"
                >
                  ou ver e preencher no formulário da página ↓
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="t-exit-form" noValidate>
                <p className="t-exit-form-instructions">
                  Preencha os seus dados para ser contactado diretamente pelo proprietário:
                </p>

                <div className="t-exit-field">
                  <label className="t-exit-field-label" htmlFor="exit-nome">
                    Nome Completo <span className="t-required">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="exit-nome"
                    type="text"
                    className="t-exit-input"
                    placeholder="Ex: João Silva"
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="t-exit-field">
                  <label className="t-exit-field-label" htmlFor="exit-telemovel">
                    Número / Telemóvel <span className="t-required">*</span>
                  </label>
                  <input
                    id="exit-telemovel"
                    type="tel"
                    className="t-exit-input"
                    placeholder="Ex: 912 345 678"
                    value={telemovel}
                    onChange={(e) => {
                      setTelemovel(formatPhoneInput(e.target.value));
                      if (errorMessage) setErrorMessage('');
                    }}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>

                {errorMessage && (
                  <div className="t-exit-error-msg">
                    <span>⚠️</span> {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  id="cta_exit_intent_submit"
                  className="t-btn t-btn-cta t-btn-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span>A registar contacto...</span>
                  ) : (
                    <>
                      <span>Quero ser contactado</span>
                      <span className="t-btn-arrow">→</span>
                    </>
                  )}
                </button>

                <p className="t-exit-privacy-note">
                  🔒 Contacto 100% privado · Conversa direta com André Queirós
                </p>

                <button
                  type="button"
                  onClick={handleGoToForm}
                  className="t-exit-skip-to-form"
                >
                  ou ir diretamente para o formulário na página ↓
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
