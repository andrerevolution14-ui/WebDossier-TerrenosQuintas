'use client';

const inclusions = [
  'Lote urbano de 233 m² plano com frente de rua e infraestruturas concluídas (água, luz, saneamento, fibra)',
  'Projeto de Arquitetura 100% deferido e aprovado pelos serviços de urbanismo da Câmara Municipal de Aveiro',
  'Processo PIP deferido com viabilidade legal e implantação garantida (poupança de 12 a 24 meses de espera)',
  'Materiais técnicos incluídos: Planta Técnica 2D, Modelo Espacial 3D e Renders Fotorrealistas de alta definição',
  'Venda direta com o proprietário — sem comissões de imobiliária ou intermediários',
];

export default function TerrenosPricing() {
  return (
    <section className="t-section" id="preco">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">Valor & Transparência</p>
          <h2 className="t-heading">
            Preço do Lote & Projeto Aprovado
          </h2>
          <p className="t-section-sub">
            O valor inclui o terreno e toda a documentação arquitetónica já aprovada.
          </p>
        </div>

        {/* Cartão de Preço Clean, Simples e Elegante */}
        <div className="t-clean-pricing-card">
          <div className="t-clean-pricing-top">
            <div className="t-clean-pricing-val-wrap">
              <span className="t-clean-pricing-val">55.000 €</span>
              <span className="t-clean-pricing-tag">Negociável</span>
            </div>
            <p className="t-clean-pricing-subtitle">
              Pacote Completo · Venda Direta com o Proprietário
            </p>
          </div>

          <div className="t-clean-pricing-features">
            {inclusions.map((item, idx) => (
              <div key={idx} className="t-clean-pricing-feat">
                <span className="t-clean-pricing-feat-icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Destaque Financeiro: IVA a 6% */}
          <div className="t-clean-pricing-tax-box">
            <span className="t-clean-pricing-tax-icon">💎</span>
            <div>
              <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>
                Benefício Fiscal: IVA a 6% na Construção da Moradia
              </strong>
              <span>
                A empreitada desta moradia qualifica-se legalmente para a taxa reduzida de IVA a 6%
                (face aos 23% habituais), representando uma poupança estimada de <strong>cerca de 40.000€ em impostos</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Opção B: Moradia Concluída em Verdemont.eu */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 28px',
            background: 'var(--bg-alt)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-card)',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)' }}>
              ✦ Ou Prefere a Moradia Já Construída?
            </span>
            <span style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              335.000€ Chave na Mão
            </span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
            Se prefere receber a moradia Domaine XXV 100% pronta a habitar (com jardim privativo de ~82 m², garagem coberta
            e acabamentos de luxo) em 10 meses e com avaliação bancária de <strong>450.000€</strong>, consulte todos os detalhes e o preço final concluído.
          </p>
          <div style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
            <a
              href="https://www.verdemont.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="t-btn t-btn-outline"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--gold)' }}
            >
              <span>Ver Moradia Terminada em Verdemont.eu ↗</span>
            </a>
          </div>
        </div>

        {/* Botão Pequeno e Delicado */}
        <div className="t-cta-center">
          <a href="#formulario" id="cta_pricing_contacto" className="t-btn t-btn-cta t-cta-scroll">
            <span>Tenho Interesse — Quero Ser Contactado</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
