'use client';

import { scrollToForm } from '@/lib/scrollToForm';

const specs = [
  {
    icon: '📐',
    label: 'Área Total do Lote',
    value: '233 m²',
    detail: 'Terreno plano, 100% aproveitável para moradia e logradouro.',
  },
  {
    icon: '🏠',
    label: 'Tipologia Projetada',
    value: 'Moradia T3 Contemporânea',
    detail: 'R/C, 1º Piso e Recuado com suites, varandas e garagem.',
  },
  {
    icon: '💶',
    label: 'Enquadramento Fiscal',
    value: 'IVA a 6% na Construção',
    detail: 'Taxa reduzida de IVA na empreitada (poupança até 40.000€).',
  },
  {
    icon: '🔌',
    label: 'Infraestruturas',
    value: '100% Concluídas à Porta',
    detail: 'Água, eletricidade, saneamento e fibra ótica prontas a ligar.',
  },
  {
    icon: '🏗️',
    label: 'Sistema Construtivo',
    value: 'Betão Armado ou LSF',
    detail: 'Opção de construir em alvenaria tradicional ou aço leve.',
  },
  {
    icon: '📏',
    label: 'Topografia do Solo',
    value: 'Terreno 100% Plano',
    detail: 'Poupança direta em escavações, aterro e muros de suporte.',
  },
  {
    icon: '☀️',
    label: 'Exposição Solar',
    value: 'Nascente / Poente',
    detail: 'Luz natural o dia todo e máxima eficiência energética.',
  },
  {
    icon: '📍',
    label: 'Localização Estratégica',
    value: 'Quintãs, Oliveirinha',
    detail: 'A 7 min de Aveiro e a 5 min do nó da A25 / N109.',
  },
  {
    icon: '📄',
    label: 'Licenciamento & Registo',
    value: 'Projeto Aprovado na Câmara',
    detail: 'Aprovado formalmente. Poupa 12 a 24 meses de burocracias.',
  },
];

export default function TerrenosDetails() {
  return (
    <section className="t-section" id="especificacoes">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">📑 / FICHA TÉCNICA & ENQUADRAMENTO</p>
          <h2 className="t-heading">
            🏛️ Especificações Técnicas da Construção e do Lote
          </h2>
          <p className="t-section-sub">
            Parâmetros do lote com projeto aprovado — <strong>51.000€</strong> nesta semana c/ <strong>desconto de 4.000€</strong> (negociável).
          </p>
        </div>

        {/* Morada em destaque com cantos retos arquitetónicos */}
        <div className="t-address-box">
          <span className="t-address-icon">📍</span>
          <div className="t-address-body">
            <span className="t-address-label">Morada Exata:</span>
            <span className="t-address-val">Rua Acácio Simões Vieira (Lote 25), Quintãs, 3810-843 Oliveirinha, Aveiro</span>
            <span className="t-address-hint">(A apenas 7 minutos do Glicínias Plaza e centro de Aveiro)</span>
          </div>
        </div>

        {/* Grelha de Especificações Técnicas (Cantos Retos Arquitetónicos) */}
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

        {/* Nota Informativa de Alto Contraste sobre o IVA a 6% na Construção */}
        <div className="t-vat-notice-card">
          <div className="t-vat-notice-badge">
            <span>💶 Benefício Fiscal · Taxa Reduzida</span>
          </div>
          <div className="t-vat-notice-content">
            <h4 className="t-vat-notice-title">
              Nota Legal: IVA a 6% na Construção da Moradia
            </h4>
            <p className="t-vat-notice-desc">
              O benefício fiscal da <strong>taxa reduzida de IVA a 6%</strong> aplica-se diretamente à
              empreitada de construção da moradia destinada a <strong>habitação própria permanente</strong> (ao abrigo
              do Código do IVA). Face à taxa geral de 23%, representa{' '}
              <strong>menos por volta de 40.000€ no valor de construção em impostos</strong>.
            </p>
          </div>
        </div>

        {/* Apoio ao Financiamento e Construção */}
        <div className="t-support-banner" style={{ borderRadius: 'var(--radius-subtle)' }}>
          <div className="t-support-item">
            <span className="t-support-icon">🏦</span>
            <div>
              <span className="t-support-title">Apoio ao Financiamento Bancário</span>
              <span className="t-support-desc">
                Auxiliamos no processo de crédito hipotecário para compra do lote e libertação de tranches para a construção.
              </span>
            </div>
          </div>
          <div className="t-support-divider" />
          <div className="t-support-item">
            <span className="t-support-icon">🏗️</span>
            <div>
              <span className="t-support-title">Apoio à Construção e Orçamentação</span>
              <span className="t-support-desc">
                Possibilidade de contacto direto com parceiros construtivos de referência (ex: Grupo Freitas) para execução em Betão ou LSF.
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
            <span>📅 Agendar Visita ao Terreno</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
