'use client';

import { useState } from 'react';
import { scrollToForm } from '@/lib/scrollToForm';

const faqs = [
  {
    q: 'Qual é a situação exata da aprovação do projeto de arquitetura?',
    a: 'O projeto de arquitetura foi formalmente deferido e aprovado pela Câmara Municipal de Aveiro. Uma vez que decorreram mais de 2 anos sem o início físico da obra, é necessário efetuar um aditamento administrativo para a emissão da licença de construção com os termos de responsabilidade dos técnicos autores das especialidades (conforme estabelecido no regime Simplex Urbanístico). A volumetria e implantação estão seguras, não havendo risco de indeferimento de arquitetura.',
  },
  {
    q: 'Como funciona o benefício do IVA a 6% para construção de habitação própria?',
    a: 'A empreitada de construção de moradia destinada a habitação própria permanente qualifica-se legalmente para a taxa reduzida de IVA a 6% ao abrigo do Código do IVA. Comparativamente à taxa normal de 23%, isto representa uma poupança fiscal direta de 17 pontos percentuais — o que se traduz em cerca de 35.000€ a 40.000€ que não saem do seu bolso durante a obra.',
  },
  {
    q: 'Este lote pode ser comprado com a moradia construída chave na mão?',
    a: 'Sim! Tem duas opções: comprar apenas o lote com o projeto de arquitetura aprovado por 51.000 € (negociável) para construir ao seu ritmo ou com o seu próprio empreiteiro, ou optar pela moradia construída chave na mão por 335.000 €, através do projeto Domaine XXV estruturado com construtores parceiros qualificados.',
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
    q: 'O valor de 51.000 € é realmente negociável?',
    a: 'Sim. O valor de 51.000 € está aberto a propostas sérias de compradores com capacidade de decisão e perfil validado. A venda é direta com o proprietário André Queirós, sem qualquer comissão de intermediação imobiliária.',
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
