'use client';

import { scrollToForm } from '@/lib/scrollToForm';

const specs = [
  {
    icon: '📐',
    label: 'Área & Terreno',
    value: '233 m² Plano',
    detail: 'Terreno 100% aproveitável com infraestruturas prontas à porta.',
  },
  {
    icon: '🏠',
    label: 'Tipologia Projetada',
    value: 'Moradia T3 Contemporânea',
    detail: 'R/C, 1º Piso e Recuado com suites, varandas e garagem.',
  },
  {
    icon: '💶',
    label: 'Benefício Fiscal',
    value: 'IVA a 6% na Empreitada',
    detail: 'Taxa reduzida com poupança de até 40.000€ para habitação própria.',
  },
  {
    icon: '📄',
    label: 'Licenciamento',
    value: 'Arquitetura Aprovada',
    detail: 'Câmara de Aveiro · Aditamento administrativo para licença.',
  },
  {
    icon: '🏗️',
    label: 'Sistema Construtivo',
    value: 'Betão Armado ou LSF',
    detail: 'Total liberdade na escolha do construtor e do método.',
  },
  {
    icon: '☀️',
    label: 'Exposição Solar',
    value: 'Nascente / Poente',
    detail: 'Luz natural o dia todo e máxima eficiência energética.',
  },
];

export default function TerrenosDetails() {
  return (
    <section className="t-section" id="especificacoes">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">FICHA TÉCNICA DO LOTE & PROJETO</p>
          <h2 className="t-heading">
            Especificações Técnicas
          </h2>
          <p className="t-section-sub">
            Parâmetros do lote de 233 m² com projeto de arquitetura aprovado — <strong>51.000 €</strong> (negociável).
          </p>
        </div>

        {/* Morada em destaque */}
        <div className="t-address-box">
          <div className="t-address-body">
            <span className="t-address-label">Morada:</span>
            <span className="t-address-val">Rua Acácio Simões Vieira (Lote 25), Quintãs, Aveiro</span>
            <span className="t-address-hint">(A 7 minutos do Glicínias Plaza e centro da cidade)</span>
          </div>
        </div>

        {/* Grelha de Especificações Técnicas (6 Itens Diretos) */}
        <div className="t-specs-grid">
          {specs.map((s) => (
            <div key={s.label} className="t-spec-card">
              <span className="t-spec-icon">{s.icon}</span>
              <div className="t-spec-body">
                <span className="t-spec-label">{s.label}</span>
                <span className="t-spec-value">{s.value}</span>
                <span className="t-spec-detail">{s.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Apoio ao Financiamento e Construção (Compacto) */}
        <div className="t-support-banner" style={{ borderRadius: 'var(--radius-subtle)', marginTop: '20px' }}>
          <div className="t-support-item">
            <span className="t-support-icon">🏦</span>
            <div>
              <span className="t-support-title">Apoio ao Financiamento Bancário</span>
              <span className="t-support-desc">
                Auxiliamos no processo de crédito bancário para compra do lote e construção.
              </span>
            </div>
          </div>
          <div className="t-support-divider" />
          <div className="t-support-item">
            <span className="t-support-icon">🏗️</span>
            <div>
              <span className="t-support-title">Apoio à Construção e Orçamentos</span>
              <span className="t-support-desc">
                Contacto direto com construtores parceiros qualificados para Betão ou LSF.
              </span>
            </div>
          </div>
        </div>

        <div className="t-cta-center">
          <a
            href="#formulario"
            onClick={scrollToForm}
            id="cta2_contacto_specs"
            className="t-btn t-btn-cta t-cta-scroll"
          >
            <span>Agendar Visita ao Terreno</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
