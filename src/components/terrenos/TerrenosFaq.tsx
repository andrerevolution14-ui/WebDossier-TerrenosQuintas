'use client';

import { useState } from 'react';
import { scrollToForm } from '@/lib/scrollToForm';

const faqs = [
  {
    q: 'Qual é o estado da aprovação do projeto de arquitetura?',
    a: 'O projeto foi formalmente aprovado pela Câmara Municipal de Aveiro. Requer apenas o aditamento administrativo das especialidades para emissão da licença de construção (regime Simplex). A volumetria e implantação estão seguras.',
  },
  {
    q: 'Como funciona a poupança do IVA a 6% na construção?',
    a: 'A construção de moradia para habitação própria permanente beneficia legalmente da taxa reduzida de IVA a 6% (Código do IVA), em vez dos 23% habituais. Isto representa uma poupança direta de cerca de 35.000€ a 40.000€ no custo da obra.',
  },
  {
    q: 'Posso comprar apenas o lote ou também a moradia pronta (chave na mão)?',
    a: 'Tem as duas opções: comprar apenas o lote com projeto por 51.000 € (negociável) para construir com o seu empreiteiro, ou a moradia chave na mão por 335.000 € com construtores parceiros qualificados.',
  },
  {
    q: 'As infraestruturas estão concluídas à porta do lote?',
    a: 'Sim. A rua está asfaltada com passeio e iluminação pública. As ligações de água, saneamento, eletricidade e fibra ótica estão prontas à porta, sem custos adicionais de extensão de redes.',
  },
  {
    q: 'O valor de 51.000 € é negociável e existe apoio ao crédito bancário?',
    a: 'Sim, o valor está aberto a propostas sérias em venda direta com o proprietário André Queirós (sem comissões). Prestamos também acompanhamento no processo de crédito bancário para o lote e construção.',
  },
];

export default function TerrenosFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="t-section t-section--alt" id="faq">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">ESCLARECIMENTO TOTAL</p>
          <h2 className="t-heading">Perguntas Frequentes</h2>
          <p className="t-section-sub">
            Respostas diretas e honestas às principais dúvidas sobre este terreno, o projeto e o processo de compra.
          </p>
        </div>

        <div className="t-faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className={`t-faq-item ${isOpen ? 't-faq-item--open' : ''}`}
              >
                <button
                  className="t-faq-trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="t-faq-question">{faq.q}</span>
                  <span className="t-faq-arrow">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="t-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="t-cta-center">
          <a
            href="#formulario"
            onClick={scrollToForm}
            id="cta_faq_contacto"
            className="t-btn t-btn-cta t-cta-scroll"
          >
            <span>Agendar Visita e Falar com o Proprietário</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
