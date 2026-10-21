'use client';

import { useState, useRef, useEffect } from 'react';
import { scrollToForm } from '@/lib/scrollToForm';
import { trackFormSubmissionLead, trackWhatsAppContact } from '@/lib/analytics';
import { saveLeadToSupabase } from '@/lib/supabase';

const WA_PHONE = '351920601070';
const WA_DIRECT_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
  'Olá André! Vi o terreno em Quintãs (51.000€ negociável) e gostaria de agendar uma visita!'
)}`;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Status = 'idle' | 'sending' | 'success' | 'error';

/** Texto gravado na coluna `quando_ligar` do Supabase */
const LABEL_HORARIO = {
  manha: 'Manhã (9h–13h)',
  tarde: 'Tarde (14h–19h)',
  noite: 'Noite (19h–21h)',
  qualquer: 'Qualquer hora / Mais breve',
} as const;

/** Texto gravado na coluna `quando_visitar` do Supabase */
const LABEL_VISITA = {
  semana: 'Dias úteis (Seg–Sex)',
  'fim-semana': 'Fim de semana (Sáb–Dom)',
  qualquer: 'Qualquer dia / Flexível',
} as const;

/** Financiamento ou simulação bancária */
const LABEL_FINANCIAMENTO = {
  sim_preaprovado: 'Sim, pré-aprovado',
  simulacao_feita: 'Simulação feita',
  em_analise: 'Em análise bancária',
  capitais_proprios: 'Capitais próprios',
  ainda_nao: 'Ainda não',
} as const;

interface SubmittedLead {
  nome: string;
  telemovel: string;
  formattedPhone: string;
  timestamp: string;
  horario: string;
  preferencia: string;
  financiamento: string;
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
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
  const [horarioContacto, setHorarioContacto] = useState<'manha' | 'tarde' | 'noite' | 'qualquer'>('qualquer');
  const [preferenciaVisita, setPreferenciaVisita] = useState<'semana' | 'fim-semana' | 'qualquer'>('qualquer');
  const [financiamento, setFinanciamento] = useState<keyof typeof LABEL_FINANCIAMENTO>('simulacao_feita');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<SubmittedLead | null>(null);
  const [touchedPhone, setTouchedPhone] = useState(false);

  const formCardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Escuta cliques em links para #formulario em toda a página e interceta com navegação suave
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
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
    const eventId = `lead_form_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    const labelHorario = LABEL_HORARIO[horarioContacto];
    const labelPreferencia = LABEL_VISITA[preferenciaVisita];
    const labelFinanciamento = LABEL_FINANCIAMENTO[financiamento];

    const payloadMensagem = `Financiamento: ${labelFinanciamento} | Lote: 51.000€ (Negociável)`;

    let savedOk = false;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          telemovel: formattedDisplay,
          quandoLigar: labelHorario,
          quandoVisitar: labelPreferencia,
          financiamento: labelFinanciamento,
          mensagem: payloadMensagem,
          origem: 'Agendamento de Visita — Terreno Quintãs (51.000€)',
          eventId,
          fbp,
          fbc,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      if (res.ok) {
        savedOk = true;
      }
    } catch (err) {
      console.warn('⚠️ [/api/lead] Falha de rede/servidor, tentando fallback direto ao Supabase...', err);
    }

    // Se o endpoint da API falhou por qualquer motivo, tenta gravação direta cliente -> Supabase
    if (!savedOk) {
      try {
        const directRes = await saveLeadToSupabase({
          nome: nome.trim(),
          telemovel: formattedDisplay,
          quando_ligar: labelHorario,
          quando_visitar: labelPreferencia,
          mensagem: payloadMensagem,
          origem: 'Agendamento de Visita (Fallback Cliente Supabase)',
          status: 'nova',
        });
        if (directRes.success) {
          savedOk = true;
        }
      } catch (clientErr) {
        console.error('Falha também no fallback direto do Supabase:', clientErr);
      }
    }

    if (!savedOk) {
      setStatus('error');
      setErrorMessage('Não foi possível enviar de momento. Pode contactar-nos diretamente pelo WhatsApp.');
      return;
    }

    // Disparo para o Meta Pixel como LEAD
    trackFormSubmissionLead({
      nome: nome.trim(),
      telemovel: formattedDisplay,
      eventId,
    });

    setSubmittedData({
      nome: nome.trim(),
      telemovel: telemovel.trim(),
      formattedPhone: formattedDisplay,
      timestamp: nowTime,
      horario: labelHorario,
      preferencia: labelPreferencia,
      financiamento: labelFinanciamento,
    });
    setStatus('success');
  }

  function handleEditNumber() {
    setStatus('idle');
    setTimeout(() => {
      const phoneInput = document.getElementById('t-telemovel') as HTMLInputElement | null;
      phoneInput?.focus();
    }, 100);
  }

  const customWaSuccessUrl = submittedData
    ? `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
        `Olá André! Acabei de agendar uma visita ao terreno em Quintãs (${submittedData.nome} - ${submittedData.formattedPhone}). Preferência: ${submittedData.preferencia} | Contacto: ${submittedData.horario} | Financiamento: ${submittedData.financiamento}.`
      )}`
    : WA_DIRECT_URL;

  return (
    <section className="t-section t-section--form" id="contacto">
      <div className="t-wrap">
        <div className="t-form-container">
          {/* Left: copy focado na transparência e benefícios reais */}
          <div className="t-form-copy">
            <p className="t-label t-label-accent">PRIMEIRO PASSO PARA A SUA MORADIA</p>
            <h2 className="t-heading t-heading--light">
              Venha Conhecer o Lugar Onde<br />Vai Construir a Sua Moradia
            </h2>
            <p className="t-form-sub">
              Pise o terreno, sinta a tranquilidade da zona residencial, imagine o seu jardim privativo — e confirme que o Glicínias Plaza e o centro estão <strong>a apenas 7 minutos</strong>.
              A visita é gratuita, sem qualquer compromisso, e acompanhada pelo proprietário.
            </p>

            {/* Destaque do Lote no formulário */}
            <div className="t-form-promo-banner">
              <div className="t-form-promo-text">
                <strong>Lote de 233 m² por 51.000 € (Negociável)</strong>
                <span>Venda direta com o proprietário · Apoio em financiamento bancário e construção</span>
              </div>
            </div>

            <ul className="t-form-bullets">
              <li>
                <span className="t-bullet-icon" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
                <span>Terreno plano com todas as infraestruturas prontas à porta</span>
              </li>
              <li>
                <span className="t-bullet-icon" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
                <span>A <strong>7 min do centro de Aveiro</strong> e dos nós da A17/EN109</span>
              </li>
              <li>
                <span className="t-bullet-icon" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
                <span>Benefício fiscal de <strong>IVA a 6%</strong> na construção para habitação própria (~40.000€ poupados)</span>
              </li>
              <li>
                <span className="t-bullet-icon" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
                <span>Projeto de arquitetura aprovado pela Câmara de Aveiro · Aditamento para licença</span>
              </li>
              <li>
                <span className="t-bullet-icon" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
                <span>Opção só lote com projeto (51.000 €) ou <strong>moradia chave na mão (335.000 €)</strong></span>
              </li>
              <li>
                <span className="t-bullet-icon" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
                <span>Conversa direta com André Queirós — <strong>sem intermediários</strong></span>
              </li>
            </ul>

            {/* Direct WhatsApp */}
            <div className="t-direct-wa-box">
              <p className="t-direct-wa-label">Prefere falar já agora?</p>
              <a
                href={WA_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="t-direct-wa-btn"
                id="cta_form_direct_wa"
                onClick={() =>
                  trackWhatsAppContact('formulario_whatsapp_direto', {
                    nome: nome.trim() || undefined,
                    telemovel: telemovel.trim() || undefined,
                  })
                }
              >
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
                <h3 className="t-success-title">Visita & Contacto Confirmados!</h3>

                {/* Cartão de Confirmação Oficial */}
                <div className="t-confirmed-box">
                  <div className="t-confirmed-header">
                    <span className="t-confirmed-label">Dados do Agendamento</span>
                    <span className="t-confirmed-badge">✓ Verificado</span>
                  </div>

                  <div className="t-confirmed-phone-val">
                    <span>{submittedData.formattedPhone}</span>
                  </div>

                  <div className="t-confirmed-meta-grid">
                    <div className="t-confirmed-meta-item">
                      <span className="t-meta-k">Titular:</span>
                      <span className="t-meta-v">{submittedData.nome}</span>
                    </div>
                    <div className="t-confirmed-meta-item">
                      <span className="t-meta-k">Hora de Contacto:</span>
                      <span className="t-meta-v">{submittedData.horario}</span>
                    </div>
                    <div className="t-confirmed-meta-item">
                      <span className="t-meta-k">Preferência de Visita:</span>
                      <span className="t-meta-v">{submittedData.preferencia}</span>
                    </div>
                    <div className="t-confirmed-meta-item">
                      <span className="t-meta-k">Financiamento:</span>
                      <span className="t-meta-v">{submittedData.financiamento}</span>
                    </div>
                  </div>

                  <div className="t-confirmed-notice">
                    <span>
                      André Queirós irá contactá-lo(a) para o número indicado na sua melhor hora para combinar a visita.
                    </span>
                  </div>

                  {/* Opção para corrigir número */}
                  <button
                    type="button"
                    onClick={handleEditNumber}
                    className="t-confirmed-edit-btn"
                  >
                    <span>Enganou-se no número?</span>
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
                    onClick={() =>
                      trackWhatsAppContact('formulario_sucesso_whatsapp', {
                        nome: submittedData.nome,
                        telemovel: submittedData.formattedPhone,
                      })
                    }
                  >
                    <span>Falar Agora no WhatsApp</span>
                    <span className="t-btn-arrow">→</span>
                  </a>
                </div>

                <p className="t-success-footer-note">
                  Prefere chamada telefónica? Aguarde o contacto direto de André Queirós.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="t-form" noValidate>
                <h3 className="t-form-title">Agendar Visita ao Terreno</h3>
                {/* Espelho das escolhas para o rastreio do WhatsApp (analytics.ts) gravar também estes campos */}
                <input type="hidden" id="t-quando-ligar" value={LABEL_HORARIO[horarioContacto]} readOnly />
                <input type="hidden" id="t-quando-visitar" value={LABEL_VISITA[preferenciaVisita]} readOnly />
                <input type="hidden" id="t-financiamento" value={LABEL_FINANCIAMENTO[financiamento]} readOnly />
                <p className="t-form-intro">
                  Lote por <strong>51.000 €</strong> (negociável). Deixe os seus dados e combinamos a visita ao terreno sem compromisso.
                </p>

                {/* 1. Nome Completo */}
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

                {/* 2. Telemóvel */}
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
                          <span>Número pronto para confirmação da visita</span>
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

                {/* 3. Melhor Hora para Contactar */}
                <div className="t-field-group">
                  <label className="t-field-label">Qual a melhor hora para contactar?</label>
                  <div className="t-choice-pills-grid t-choice-pills--time" role="radiogroup" aria-label="Melhor hora para contactar">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={horarioContacto === 'manha'}
                      className={`t-choice-pill ${horarioContacto === 'manha' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setHorarioContacto('manha')}
                    >
                      <span>Manhã</span>
                      <small>9h – 13h</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={horarioContacto === 'tarde'}
                      className={`t-choice-pill ${horarioContacto === 'tarde' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setHorarioContacto('tarde')}
                    >
                      <span>Tarde</span>
                      <small>14h – 19h</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={horarioContacto === 'noite'}
                      className={`t-choice-pill ${horarioContacto === 'noite' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setHorarioContacto('noite')}
                    >
                      <span>Noite</span>
                      <small>19h – 21h</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={horarioContacto === 'qualquer'}
                      className={`t-choice-pill ${horarioContacto === 'qualquer' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setHorarioContacto('qualquer')}
                    >
                      <span>Qualquer hora</span>
                      <small>Mais breve</small>
                    </button>
                  </div>
                </div>

                {/* 4. Quando prefere fazer a visita? */}
                <div className="t-field-group">
                  <label className="t-field-label">Quando prefere fazer a visita ao terreno?</label>
                  <div className="t-choice-pills-grid t-choice-pills--visit" role="radiogroup" aria-label="Preferência de dia de visita">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={preferenciaVisita === 'semana'}
                      className={`t-choice-pill ${preferenciaVisita === 'semana' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setPreferenciaVisita('semana')}
                    >
                      <span>Dias Úteis</span>
                      <small>Segunda a Sexta</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={preferenciaVisita === 'fim-semana'}
                      className={`t-choice-pill ${preferenciaVisita === 'fim-semana' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setPreferenciaVisita('fim-semana')}
                    >
                      <span>Fim de Semana</span>
                      <small>Sábado ou Domingo</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={preferenciaVisita === 'qualquer'}
                      className={`t-choice-pill ${preferenciaVisita === 'qualquer' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setPreferenciaVisita('qualquer')}
                    >
                      <span>Flexível</span>
                      <small>A combinar</small>
                    </button>
                  </div>
                </div>

                {/* 5. Já tem financiamento ou simulação? */}
                <div className="t-field-group">
                  <label className="t-field-label">Já tem financiamento ou simulação?</label>
                  <div className="t-choice-pills-grid t-choice-pills--finance" role="radiogroup" aria-label="Já tem financiamento ou simulação?">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={financiamento === 'sim_preaprovado'}
                      className={`t-choice-pill ${financiamento === 'sim_preaprovado' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setFinanciamento('sim_preaprovado')}
                    >
                      <span>Sim, pré-aprovado</span>
                      <small>Crédito aprovado</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={financiamento === 'simulacao_feita'}
                      className={`t-choice-pill ${financiamento === 'simulacao_feita' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setFinanciamento('simulacao_feita')}
                    >
                      <span>Simulação feita</span>
                      <small>Valores conhecidos</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={financiamento === 'em_analise'}
                      className={`t-choice-pill ${financiamento === 'em_analise' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setFinanciamento('em_analise')}
                    >
                      <span>Em análise</span>
                      <small>A aguardar banco</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={financiamento === 'capitais_proprios'}
                      className={`t-choice-pill ${financiamento === 'capitais_proprios' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setFinanciamento('capitais_proprios')}
                    >
                      <span>Capitais próprios</span>
                      <small>Sem financiamento</small>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={financiamento === 'ainda_nao'}
                      className={`t-choice-pill ${financiamento === 'ainda_nao' ? 't-choice-pill--active' : ''}`}
                      onClick={() => setFinanciamento('ainda_nao')}
                    >
                      <span>Ainda não</span>
                      <small>Gostaria de apoio</small>
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="t-form-error">
                    <p>{errorMessage}</p>
                    <a
                      href={WA_DIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-form-error-wa"
                      onClick={() =>
                        trackWhatsAppContact('formulario_erro_whatsapp', {
                          nome: nome.trim() || undefined,
                          telemovel: telemovel.trim() || undefined,
                        })
                      }
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
                      <span>A Registar Agendamento...</span>
                    </>
                  ) : (
                    <>
                      <span>Agendar Visita ao Terreno</span>
                      <span className="t-btn-arrow">→</span>
                    </>
                  )}
                </button>

                <div className="t-form-guarantee">
                  <span>Visita 100% gratuita e sem qualquer compromisso.</span>
                  <span>Contacto direto de André Queirós, proprietário.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
