'use client';

import { useState, useRef, useEffect } from 'react';
import { scrollToForm } from '@/lib/scrollToForm';
import { trackFormSubmissionLead } from '@/lib/analytics';

const WA_PHONE = '351920601070';
const WA_DIRECT_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
  'Olá André! Tenho interesse no Lote de Terreno em Quintãs (Aveiro) por 55.000€. Gostaria de saber mais e ser contactado.'
)}`;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Status = 'idle' | 'sending' | 'success' | 'error';

interface SubmittedLead {
  nome: string;
  telemovel: string;
  formattedPhone: string;
  timestamp: string;
}

function fireMetaPixelLead() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
}

/**
 * Formata o número visualmente à medida que o utilizador escreve.
 * Suporta formato nacional de 9 dígitos (ex: 912 345 678) ou internacional (+351 ...).
 */
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

/**
 * Normaliza o número para exibição de prestígio no cartão de confirmação.
 */
function getDisplayConfirmedPhone(val: string): string {
  const digits = val.replace(/\D/g, '');
  if (val.trim().startsWith('+')) {
    return val.trim();
  }
  if (digits.length === 9) {
    return `+351 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  if (digits.startsWith('351') && digits.length >= 12) {
    const nat = digits.slice(3);
    return `+351 ${nat.slice(0, 3)} ${nat.slice(3, 6)} ${nat.slice(6, 9)}`;
  }
  return val.trim();
}

export default function TerrenosForm() {
  const [nome, setNome] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<SubmittedLead | null>(null);
  const [touchedPhone, setTouchedPhone] = useState(false);

  const formCardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Escuta cliques em links para #formulario em toda a página e interceta com navegação suave
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (target && target.getAttribute('href') === '#formulario') {
        e.preventDefault();
        scrollToForm();
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Se a página carregar diretamente com a hash #formulario
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#formulario') {
      setTimeout(() => scrollToForm(), 350);
    }
  }, []);

  const phoneDigitsCount = telemovel.replace(/\D/g, '').length;
  const isPhoneValid = phoneDigitsCount >= 9;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneInput(e.target.value);
    setTelemovel(formatted);
    if (!touchedPhone) setTouchedPhone(true);
    if (errorMessage) setErrorMessage('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouchedPhone(true);

    if (!nome.trim()) {
      setErrorMessage('Por favor introduza o seu nome completo.');
      return;
    }

    if (!isPhoneValid) {
      setErrorMessage('Por favor introduza um número de telemóvel válido (mínimo 9 dígitos).');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const formattedDisplay = getDisplayConfirmedPhone(telemovel);
    const nowTime = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          telemovel: formattedDisplay,
          origem: 'Formulário — Dossier Terreno Quintãs, Aveiro',
        }),
      });

      if (!res.ok) throw new Error('Falha ao enviar o formulário.');

      // Disparo para o Meta Pixel como LEAD (Objetivo Mais Alto - ID: 26022738390737044)
      trackFormSubmissionLead({
        nome: nome.trim(),
        telemovel: formattedDisplay,
      });

      setSubmittedData({
        nome: nome.trim(),
        telemovel: telemovel.trim(),
        formattedPhone: formattedDisplay,
        timestamp: nowTime,
      });
      setStatus('success');

      // Garante que o ecrã desliza exatamente para o cartão de confirmação do número
      setTimeout(() => {
        if (formCardRef.current) {
          formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch {
      setStatus('error');
      setErrorMessage('Não foi possível enviar de momento. Pode contactar-nos diretamente pelo WhatsApp.');
    }
  }

  function handleEditNumber() {
    setStatus('idle');
    setErrorMessage('');
    setTimeout(() => {
      const phoneInput = document.getElementById('t-telemovel') as HTMLInputElement | null;
      if (phoneInput) {
        phoneInput.focus();
        phoneInput.select();
      }
    }, 150);
  }

  const customWaSuccessUrl = submittedData
    ? `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
        `Olá André! Sou o ${submittedData.nome} (${submittedData.formattedPhone}). Confirmei o meu contacto no site sobre o terreno em Quintãs por 55.000€ e gostaria de falar agora.`
      )}`
    : WA_DIRECT_URL;

  return (
    <section className="t-section t-section--form" id="contacto">
      <div className="t-wrap">
        <div className="t-form-container">
          {/* Left: copy */}
          <div className="t-form-copy">
            <p className="t-label t-label-accent">Próximo Passo</p>
            <h2 className="t-heading t-heading--light">
              Deixe o seu Contacto<br />e Falamos Consigo Hoje
            </h2>
            <p className="t-form-sub">
              Sem compromisso. Sem spam. Apenas uma conversa direta com o proprietário para
              esclarecer dúvidas, agendar visita e, se quiser,{' '}
              <strong>avançar com a proposta</strong>.
            </p>

            <ul className="t-form-bullets">
              <li>
                <span className="t-bullet-icon">📞</span>
                <span>Contacto direto com o proprietário — André Queirós</span>
              </li>
              <li>
                <span className="t-bullet-icon">🗓️</span>
                <span>Disponibilidade para visitas <strong>esta semana</strong></span>
              </li>
              <li>
                <span className="t-bullet-icon">📋</span>
                <span>Envio imediato de todos os documentos técnicos</span>
              </li>
              <li>
                <span className="t-bullet-icon">💶</span>
                <span>Enquadramento no benefício fiscal de <strong>IVA a 6% na construção</strong></span>
              </li>
              <li>
                <span className="t-bullet-icon">🏦</span>
                <span>Apoio com financiamento bancário e orçamentação de construção</span>
              </li>
            </ul>

            <div className="t-form-urgency">
              <span>Apenas 2 lotes disponíveis · 55.000€ Negociável</span>
            </div>

            {/* Direct WhatsApp */}
            <div className="t-direct-wa-box">
              <p className="t-direct-wa-label">Prefere falar já agora?</p>
              <a
                href={WA_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="t-direct-wa-btn"
                id="cta_form_direct_wa"
              >
                <span className="t-wa-icon-svg">💬</span>
                <span>WhatsApp Direto: <strong>920 601 070</strong></span>
              </a>
            </div>
          </div>

          {/* Right: form card com id="formulario" para o salto cirúrgico */}
          <div className="t-form-card" id="formulario" ref={formCardRef}>
            {status === 'success' && submittedData ? (
              <div className="t-form-success">
                <div className="t-success-badge-wrap">
                  <div className="t-success-icon-animated">✓</div>
                </div>

                <p className="t-label t-label-accent" style={{ marginBottom: '4px' }}>
                  Registo Concluído
                </p>
                <h3 className="t-success-title">Contacto & Número Confirmados!</h3>

                {/* Cartão de Confirmação Oficial do Número */}
                <div className="t-confirmed-box">
                  <div className="t-confirmed-header">
                    <span className="t-confirmed-label">Número de Contacto Confirmado</span>
                    <span className="t-confirmed-badge">✓ Verificado</span>
                  </div>

                  <div className="t-confirmed-phone-val">
                    <span className="t-confirmed-icon">📞</span>
                    <span>{submittedData.formattedPhone}</span>
                  </div>

                  <div className="t-confirmed-meta">
                    <span>Titular: <strong>{submittedData.nome}</strong></span>
                    <span>•</span>
                    <span>🕒 Hoje às {submittedData.timestamp}</span>
                  </div>

                  <div className="t-confirmed-notice">
                    <span className="t-confirmed-notice-icon">⚡</span>
                    <span>
                      André Queirós irá contactá-lo(a) para este número <strong>ainda hoje</strong> para
                      esclarecer todas as dúvidas e agendar visita ao lote de terreno.
                    </span>
                  </div>

                  {/* Opção para corrigir número caso haja engano */}
                  <button
                    type="button"
                    onClick={handleEditNumber}
                    className="t-confirmed-edit-btn"
                  >
                    <span>✏️ Enganou-se no número?</span>
                    <strong>Clique aqui para corrigir</strong>
                  </button>
                </div>

                <div className="t-success-actions">
                  <a
                    href={customWaSuccessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-btn t-btn-cta t-btn-full"
                    id="cta_form_success_wa"
                  >
                    <span className="t-wa-icon-svg">💬</span>
                    <span>Falar Agora no WhatsApp</span>
                    <span className="t-btn-arrow">→</span>
                  </a>
                </div>

                <p className="t-success-footer-note">
                  Prefere chamada telefónica? Aguarde o contacto direto de André Queirós ainda hoje.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="t-form" noValidate>
                <h3 className="t-form-title">Quero Ser Contactado</h3>
                <p className="t-form-intro">
                  Preencha os seus dados. Resposta garantida no próprio dia.
                </p>

                <div className="t-field-group">
                  <label className="t-field-label" htmlFor="t-nome">
                    Nome Completo <span className="t-required">*</span>
                  </label>
                  <input
                    id="t-nome"
                    type="text"
                    className="t-field-input"
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

                <div className="t-field-group">
                  <label className="t-field-label" htmlFor="t-telemovel">
                    Telemóvel <span className="t-required">*</span>
                  </label>
                  <input
                    id="t-telemovel"
                    type="tel"
                    className="t-field-input"
                    placeholder="Ex: 912 345 678"
                    value={telemovel}
                    onChange={handlePhoneChange}
                    onBlur={() => setTouchedPhone(true)}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />

                  {/* Confirmação e Validação do Número em tempo real */}
                  {telemovel.length > 0 && (
                    <div
                      className={`t-phone-hint ${
                        isPhoneValid ? 't-phone-hint--valid' : 't-phone-hint--error'
                      }`}
                    >
                      {isPhoneValid ? (
                        <>
                          <span>✓</span>
                          <span>Número pronto para confirmação e chamada direta</span>
                        </>
                      ) : (
                        <>
                          <span>ℹ️</span>
                          <span>Introduza pelo menos 9 dígitos (ex: 912 345 678)</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <div className="t-form-error">
                    <p>{errorMessage}</p>
                    <a
                      href={WA_DIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-form-error-wa"
                    >
                      Falar pelo WhatsApp →
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  id="cta5_form_submit"
                  className="t-btn t-btn-cta t-btn-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="t-spinner" />
                      <span>A Confirmar Contacto...</span>
                    </>
                  ) : (
                    <>
                      <span>Quero Ser Contactado Hoje</span>
                      <span className="t-btn-arrow">→</span>
                    </>
                  )}
                </button>

                <div className="t-form-guarantee">
                  <span>🔒 Dados 100% privados e confidenciais.</span>
                  <span>⚡ Resposta direta de André Queirós, proprietário.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
