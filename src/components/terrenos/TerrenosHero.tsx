'use client';

import Image from 'next/image';
import { scrollToForm } from '@/lib/scrollToForm';

export default function TerrenosHero() {
  return (
    <section className="inst-hero" id="inicio">
      <div className="inst-hero-container">
        {/* ── 1. KICKER NO TOPO (SEM NADA EM CIMA) ── */}
        <div className="inst-kicker-center">
          <span className="inst-kicker">🏡 / LOTE URBANO COM PROJETO APROVADO</span>
        </div>

        {/* ── 2. HEADLINE SOLICITADA ── */}
        <h1 className="inst-hero-h1-center">
          O lote para a sua nova Moradia a menos de (total) 240.000€
        </h1>

        {/* ── 3. A 7 MINUTOS DE TUDO (CENTRADO) ── */}
        <div className="inst-hero-highlight-center">
          <span className="inst-hero-highlight">
            🚗 A 7 minutos de tudo em Aveiro
          </span>
        </div>

        {/* ── 4. SUBTÍTULO CONCISO & DIRETO ── */}
        <p className="inst-hero-desc-center">
          Lote de <strong>233 m²</strong> c/ <strong>projeto T3 aprovado</strong> e benefício de <strong>IVA a 6%</strong> na construção.
        </p>

        {/* ── 5. A IMAGEM COMO ESTÁ (ENTRE SUBTÍTULO E BLOCO DO PREÇO) ── */}
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
              <span>🏡 / 01 · PROJETO APROVADO T3</span>
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
              <span>📐 / 02 · LOTE REAL 233 M²</span>
            </div>
          </div>
        </div>

        {/* ── 6. BLOCO DO PREÇO (DESCONTO DE INTERESSE NESTA SEMANA) ── */}
        <div className="inst-hero-pricing-box inst-hero-pricing-box--center">
          <div className="inst-pricing-header">
            <span className="inst-pricing-kicker">✨ Desconto de interesse nesta semana</span>
            <span className="inst-pricing-saving">🏷️ -4.000 € na reserva</span>
          </div>
          <div className="inst-pricing-row">
            <div className="inst-price-main">
              <span className="inst-price-label">Esta semana:</span>
              <span className="inst-price-val">51.000 €</span>
            </div>
            <div className="inst-price-official">
              <span className="inst-price-off-label">Valor oficial:</span>
              <span className="inst-price-strike">55.000 €</span>
              <span className="inst-price-neg">Negociável</span>
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
              📅 Agendar Visita ao Terreno →
            </a>
          </div>
        </div>

        {/* ── 7. OS 4 PONTOS EM GRELHA DE 2X2 (DIRETOS E SEM BLOCOS DE TEXTO) ── */}
        <div className="inst-specs-section">
          <div className="inst-specs-intro-center">
            <span className="inst-kicker">🏛️ / ESPECIFICAÇÕES PRINCIPAIS</span>
            <h2 className="inst-specs-h2">Construção Imediata Sem Burocracias</h2>
          </div>

          <div className="inst-specs-grid-2x2">
            <div className="inst-spec-col inst-spec-col--loc">
              <span className="inst-spec-idx">📍 01 / LOCALIZAÇÃO</span>
              <h3 className="inst-spec-title">7 Min do Glicínias</h3>
              <p className="inst-spec-text">
                A <strong>7 min</strong> de Aveiro e nós da A17/EN109.
              </p>
            </div>

            <div className="inst-spec-col inst-spec-col--area">
              <span className="inst-spec-idx">📐 02 / ÁREA & LOTE</span>
              <h3 className="inst-spec-title">233 m² Plano</h3>
              <p className="inst-spec-text">
                Pronto c/ <strong>água, luz, saneamento e fibra</strong>.
              </p>
            </div>

            <div className="inst-spec-col inst-spec-col--arch">
              <span className="inst-spec-idx">🏛️ 03 / ARQUITETURA</span>
              <h3 className="inst-spec-title">Projeto T3 Aprovado</h3>
              <p className="inst-spec-text">
                Aprovado na <strong>Câmara de Aveiro</strong>. Sem esperas.
              </p>
            </div>

            <div className="inst-spec-col inst-spec-col--tax">
              <span className="inst-spec-idx">💶 04 / FISCALIDADE</span>
              <h3 className="inst-spec-title">IVA a 6% na Obra</h3>
              <p className="inst-spec-text">
                Poupança até <strong>40.000€</strong> c/ <strong>taxa reduzida de IVA</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
