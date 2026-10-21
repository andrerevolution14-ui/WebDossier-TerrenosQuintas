'use client';

import Image from 'next/image';
import { scrollToForm } from '@/lib/scrollToForm';

export default function TerrenosHero() {
  return (
    <section className="inst-hero" id="inicio">
      <div className="inst-hero-container">
        {/* ── 1. KICKER NO TOPO ── */}
        <div className="inst-kicker-center">
          <span className="inst-kicker">LOTE URBANO · QUINTÃS, OLIVEIRINHA, AVEIRO</span>
        </div>

        {/* ── 2. HEADLINE SOLICITADA ── */}
        <h1 className="inst-hero-h1-center">
          Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 €
        </h1>

        {/* ── 3. ESTADO REAL DO PROJETO & BENEFÍCIO FISCAL (CENTRADO) ── */}
        <div className="inst-hero-highlight-center">
          <span className="inst-hero-highlight">
            Projeto de arquitetura aprovado pela Câmara de Aveiro · Aditamento para emissão da licença
          </span>
        </div>

        {/* ── 4. SUBTÍTULO CONCISO & DIRETO COM DESTAQUE AO IVA A 6% ── */}
        <p className="inst-hero-desc-center">
          Terreno plano com infraestruturas prontas à porta. Poupança de até <strong>40.000€ com IVA a 6%</strong> na construção para habitação própria permanente.
        </p>

        {/* ── 5. A IMAGEM DIVIDIDA: PROJETO APROVADO + LOTE REAL ── */}
        <div className="inst-visual-feature">
          <div className="inst-visual-pane inst-visual-pane--house">
            <Image
              src="/Moradia-Noturna.jpg"
              alt="Projeto de Arquitetura Aprovado T3 em Quintãs"
              fill
              priority
              quality={92}
              sizes="(max-width: 768px) 50vw, 50vw"
              className="inst-visual-img"
              style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
            />
            <div className="inst-visual-label inst-visual-label--house">
              <span>01 · PROJETO DE ARQUITETURA T3</span>
            </div>
          </div>

          <div className="inst-visual-divider" aria-hidden="true" />

          <div className="inst-visual-pane inst-visual-pane--land">
            <Image
              src="/Curado/1.webp"
              alt="Lote Real de 233m² em Quintãs, Aveiro"
              fill
              priority
              quality={92}
              sizes="(max-width: 768px) 50vw, 50vw"
              className="inst-visual-img"
              style={{ objectFit: 'cover', objectPosition: '72% 38%' }}
            />
            <div className="inst-visual-label inst-visual-label--land">
              <span>02 · LOTE REAL 233 M²</span>
            </div>
          </div>
        </div>

        {/* ── 6. BLOCO DO PREÇO (PREÇO SIMPLES E VERDADEIRO: 51.000€ NEGOCIÁVEL) ── */}
        <div className="inst-hero-pricing-box inst-hero-pricing-box--center">
          <div className="inst-pricing-header">
            <span className="inst-pricing-kicker">Venda Direta com o Proprietário</span>
            <span className="inst-pricing-saving">Sem comissões de agência</span>
          </div>
          <div className="inst-pricing-row">
            <div className="inst-price-main">
              <span className="inst-price-label">Valor do Lote:</span>
              <span className="inst-price-val">51.000 €</span>
            </div>
            <div className="inst-price-official">
              <span className="inst-price-neg" style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                Negociável
              </span>
            </div>
          </div>

          <div className="inst-cta-wrap">
            <a
              href="#formulario"
              onClick={scrollToForm}
              className="inst-btn-pill-main"
              id="cta_hero_visita"
              title="Agendar Visita ao Terreno"
            >
              Agendar Visita ao Terreno →
            </a>
          </div>
        </div>

        {/* ── 7. OS 4 PONTOS PRINCIPAIS ── */}
        <div className="inst-specs-section">
          <div className="inst-specs-intro-center">
            <span className="inst-kicker">ESPECIFICAÇÕES PRINCIPAIS DO LOTE</span>
            <h2 className="inst-specs-h2">Terreno Plano e Infraestruturado à Porta</h2>
          </div>

          <div className="inst-specs-grid-2x2">
            <div className="inst-spec-col inst-spec-col--loc">
              <span className="inst-spec-idx">01 / LOCALIZAÇÃO</span>
              <h3 className="inst-spec-title">7 Min do Glicínias</h3>
              <p className="inst-spec-text">
                A <strong>7 min</strong> do centro de Aveiro e nós da A17/EN109.
              </p>
            </div>

            <div className="inst-spec-col inst-spec-col--area">
              <span className="inst-spec-idx">02 / ÁREA & LOTE</span>
              <h3 className="inst-spec-title">233 m² Plano</h3>
              <p className="inst-spec-text">
                Infraestruturas completas: <strong>água, luz, saneamento e fibra</strong>.
              </p>
            </div>

            <div className="inst-spec-col inst-spec-col--arch">
              <span className="inst-spec-idx">03 / ARQUITETURA</span>
              <h3 className="inst-spec-title">Projeto Aprovado</h3>
              <p className="inst-spec-text">
                Aprovado na <strong>Câmara de Aveiro</strong> · Aditamento para licença.
              </p>
            </div>

            <div className="inst-spec-col inst-spec-col--tax">
              <span className="inst-spec-idx">04 / BENEFÍCIO FISCAL</span>
              <h3 className="inst-spec-title">IVA a 6% na Construção</h3>
              <p className="inst-spec-text">
                Poupança até <strong>40.000€</strong> para habitação própria permanente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
