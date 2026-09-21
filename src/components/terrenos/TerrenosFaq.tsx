'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'O projeto de arquitetura está mesmo 100% aprovado pela Câmara de Aveiro?',
    a: 'Sim. O projeto de arquitetura foi formalmente deferido e aprovado pelos serviços de urbanismo da Câmara Municipal de Aveiro. Para o levantamento das licenças de construção é necessário realizar um Aditamento ao Processo — uma formalidade simples, necessária por o projeto ter ultrapassado o prazo máximo obrigatório de 2 anos sem início de obra. Este aditamento é rápido e não coloca em risco a aprovação já concedida.',
  },
  {
    q: 'Como funciona o benefício incrível do IVA a 6% na construção desta moradia?',
    a: 'A empreitada de construção desta moradia para habitação própria qualifica-se legalmente para a taxa reduzida de IVA a 6%. Em vez de ser tributada à taxa normal de 23%, beneficia de uma redução fiscal direta de 17 pontos percentuais — o que representa menos por volta de 40.000€ no valor de construção em impostos que permanece diretamente na sua conta bancária.',
  },
  {
    q: 'Posso escolher o meu próprio construtor? Ou sou obrigado a usar o vosso?',
    a: 'Tem total liberdade de escolha do construtor. O projeto pertence a si após a escritura — adjudica a obra a quem quiser. Se precisar, podemos apresentar parceiros de confiança (nomeadamente o Grupo Freitas Renovações) com orçamentos detalhados para Betão Armado ou LSF.',
  },
  {
    q: 'Qual a diferença entre construir em Betão Armado e em LSF?',
    a: 'Betão Armado é a construção tradicional — sólida, muito duradoura, amplamente testada. LSF (Light Steel Framing) usa estrutura de aço galvanizado — construção mais rápida (30–40% menos tempo de obra), menor peso estrutural e excelente desempenho térmico e acústico. A escolha é totalmente sua.',
  },
  {
    q: 'As infraestruturas estão mesmo todas à porta? Não preciso de pagar extensões de redes?',
    a: 'Confirmado. A rua já está asfaltada com passeio, iluminação pública, e as ligações às redes de água, saneamento, eletricidade e fibra ótica já chegam à extremidade do lote. Não há extensões de redes nem obras de urbanização a pagar.',
  },
  {
    q: 'Têm apoio para financiamento bancário?',
    a: 'Sim. Auxiliamos no processo de obtenção de crédito bancário, seja para a aquisição do terreno, seja para financiar a construção. Trabalhamos com parceiros financeiros que conhecem bem este tipo de operação imobiliária.',
  },
  {
    q: 'Como funciona a reserva, o CPCV e a escritura? O processo é seguro?',
    a: 'O processo é 100% seguro e transparente. Celebra-se um Contrato Promessa de Compra e Venda (CPCV) com prazo para escritura em Cartório ou Casa Pronta. O lote tem caderneta predial urbana e registo predial limpo, sem ónus nem encargos.',
  },
  {
    q: 'O valor de 55.000€ é realmente negociável?',
    a: 'Sim. Estamos abertos a analisar propostas sérias de compradores com perfil validado ou disponibilidade para escritura rápida. Peça-nos contacto e conversamos sem compromisso.',
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
          <p className="t-label">Esclarecimento Total</p>
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
          <a href="#formulario" id="cta_faq_contacto" className="t-btn t-btn-cta t-cta-scroll">
            <span>Tenho Outra Dúvida — Quero Ser Contactado</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
