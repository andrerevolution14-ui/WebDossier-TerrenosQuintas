'use client';

import { scrollToForm } from '@/lib/scrollToForm';

const rows = [
  {
    common: { icon: '✕', text: '12 a 24 meses de espera na Câmara para aprovar arquitetura' },
    ours: { icon: '✓', text: 'Projeto de arquitetura aprovado pela Câmara de Aveiro · Aditamento para licença' },
  },
  {
    common: { icon: '✕', text: 'Custo adicional de 5.000€ a 10.000€ em gabinetes de arquitetura' },
    ours: { icon: '✓', text: 'Projeto de arquitetura completo já incluído no valor do lote' },
  },
  {
    common: { icon: '✕', text: 'Incerteza se a implantação e volumetria serão autorizadas' },
    ours: { icon: '✓', text: 'Volumetria e implantação já deferidas formalmente pela autarquia' },
  },
  {
    common: { icon: '✕', text: 'Sem plantas cotadas, modelo 3D nem renders fotorrealistas' },
    ours: { icon: '✓', text: 'Plantas técnicas 2D, modelo 3D espacial e renders fotorrealistas incluídos' },
  },
  {
    common: { icon: '✕', text: 'Construção sujeita à taxa normal de 23% de IVA sem enquadramento' },
    ours: { icon: '✓', text: 'Benefício fiscal de IVA a 6% na construção para habitação própria (~40.000€ poupados)' },
  },
  {
    common: { icon: '✕', text: 'Valores inflacionados ou comissões de agências imobiliárias' },
    ours: { icon: '✓', text: 'A 7 min de Aveiro · 51.000 € (negociável) em venda direta com o proprietário' },
  },
];

export default function TerrenosComparison() {
  return (
    <section className="t-section" id="comparativo">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">ANÁLISE COMPARATIVA</p>
          <h2 className="t-heading">
            Porquê Este Lote e Não Outro em Aveiro?
          </h2>
          <p className="t-section-sub">
            A maioria dos terrenos no mercado exige anos de burocracias e custos acrescidos. Veja a diferença:
          </p>
        </div>

        {/* Tabela comparativa */}
        <div className="t-compare-table">
          <div className="t-compare-header">
            <div className="t-compare-col t-compare-col--bad">
              <span>Terreno Comum no Mercado</span>
            </div>
            <div className="t-compare-col t-compare-col--good">
              <span>Este Lote em Quintãs · 51.000 €</span>
            </div>
          </div>

          {rows.map((row, i) => (
            <div key={i} className="t-compare-row">
              <div className="t-compare-cell t-compare-cell--bad">
                <span className="t-compare-icon" style={{ fontWeight: 700, color: '#DC2626' }}>{row.common.icon}</span>
                <span>{row.common.text}</span>
              </div>
              <div className="t-compare-vs">VS</div>
              <div className="t-compare-cell t-compare-cell--good">
                <span className="t-compare-icon" style={{ fontWeight: 700, color: '#059669' }}>{row.ours.icon}</span>
                <span>{row.ours.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparência e Opções */}
        <div className="t-compare-urgency" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155' }}>
          <p style={{ margin: 0 }}>
            <strong>Venda Direta com André Queirós:</strong> Valor de 51.000 € (negociável). Possibilidade de aquisição só do lote com o projeto aprovado ou da moradia completa chave na mão (335.000 €).
          </p>
        </div>

        <div className="t-cta-center">
          <a
            href="#formulario"
            onClick={scrollToForm}
            id="cta4_contacto_comparativo"
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
