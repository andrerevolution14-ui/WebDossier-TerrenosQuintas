'use client';

import { useState, useRef } from 'react';

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

function fireMetaPixelLead() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
}

export default function TerrenosForm() {
  const [nome, setNome] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !telemovel.trim()) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          telemovel: telemovel.trim(),
          origem: 'Formulário — Dossier Terreno Quintãs, Aveiro',
        }),
      });

      if (!res.ok) throw new Error('Falha ao enviar o formulário.');

      fireMetaPixelLead();
      setStatus('success');
      setNome('');
      setTelemovel('');
    } catch {
      setStatus('error');
      setErrorMessage('Não foi possível enviar. Contacte-nos diretamente pelo WhatsApp.');
    }
  }

  return (
    <section className="t-section t-section--form" id="formulario">
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

          {/* Right: form card */}
          <div className="t-form-card">
            {status === 'success' ? (
              <div className="t-form-success">
                <div className="t-success-icon">✅</div>
                <h3>Contacto Recebido!</h3>
                <p>
                  Obrigado. André Queirós vai entrar em contacto consigo <strong>ainda hoje</strong>.
                </p>
                <div className="t-success-actions">
                  <a
                    href={WA_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-btn t-btn-cta t-btn-full"
                    style={{ marginTop: '20px' }}
                  >
                    <span>Falar Agora no WhatsApp</span>
                    <span className="t-btn-arrow">→</span>
                  </a>
                </div>
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
                    onChange={(e) => setNome(e.target.value)}
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
                    onChange={(e) => setTelemovel(e.target.value)}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>

                {status === 'error' && (
                  <div className="t-form-error">
                    <p>{errorMessage}</p>
                    <a href={WA_DIRECT_URL} target="_blank" rel="noopener noreferrer" className="t-form-error-wa">
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
                    <><span className="t-spinner" /><span>A Enviar...</span></>
                  ) : (
                    <><span>Quero Ser Contactado Hoje</span><span className="t-btn-arrow">→</span></>
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
