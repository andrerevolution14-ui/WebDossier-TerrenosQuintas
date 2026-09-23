import type { Metadata } from 'next';
import TerrenosHero from '@/components/terrenos/TerrenosHero';
import TerrenosGallery from '@/components/terrenos/TerrenosGallery';
import TerrenosLocation from '@/components/terrenos/TerrenosLocation';
import TerrenosProject from '@/components/terrenos/TerrenosProject';
import TerrenosDetails from '@/components/terrenos/TerrenosDetails';
import TerrenosPricing from '@/components/terrenos/TerrenosPricing';
import TerrenosComparison from '@/components/terrenos/TerrenosComparison';
import TerrenosVideo from '@/components/terrenos/TerrenosVideo';
import TerrenosFaq from '@/components/terrenos/TerrenosFaq';
import TerrenosForm from '@/components/terrenos/TerrenosForm';
import TerrenosStickyBar from '@/components/terrenos/TerrenosStickyBar';
import TerrenosWhatsAppButton from '@/components/terrenos/TerrenosWhatsAppButton';

export const metadata: Metadata = {
  title: 'Lote de Terreno c/ Projeto Aprovado e IVA a 6% na Construção | Quintãs, Oliveirinha, Aveiro | 55.000€',
  description:
    'Lote urbano de 233m² em Quintãs, Oliveirinha, a 7 min de Aveiro. Projeto 100% Aprovado pela Câmara com benefício fiscal de IVA a 6% na construção da moradia. 55.000€ Negociável.',
  alternates: {
    canonical: '/terrenos',
  },
  openGraph: {
    title: 'Lote c/ Projeto Aprovado e IVA a 6% na Construção | 55.000€ Negociável',
    description:
      'Lote 233m² em Quintãs, Oliveirinha. Projeto Aprovado pela Câmara e benefício de taxa reduzida de IVA a 6% na construção.',
    images: [{ url: '/Curado/2.webp', width: 1200, height: 675, alt: 'Terreno Quintãs Oliveirinha Aveiro com Projeto Aprovado' }],
    locale: 'pt_PT',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateListing',
      '@id': 'https://terrenosaveiro.pt/terrenos#listing',
      name: 'Lote de Terreno c/ Projeto Aprovado e IVA a 6% na Construção em Aveiro',
      description:
        'Lote urbano de 233m² em Quintãs, Oliveirinha, a 7 min de Aveiro. Projeto 100% Aprovado pela Câmara Municipal de Aveiro com benefício fiscal de IVA a 6% na construção da moradia.',
      url: 'https://terrenosaveiro.pt/terrenos',
      datePosted: '2026-09-21',
      offers: {
        '@type': 'Offer',
        price: '55000',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-09-21',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '55000',
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: true,
        },
      },
      containedInPlace: {
        '@type': 'Place',
        name: 'Quintãs, Oliveirinha, Aveiro',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua Acácio Simões Vieira, Lote 25',
          addressLocality: 'Oliveirinha',
          addressRegion: 'Aveiro',
          postalCode: '3810-843',
          addressCountry: 'PT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.5829732',
          longitude: '-8.6175628',
        },
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://terrenosaveiro.pt/terrenos#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O projeto de arquitetura está mesmo 100% aprovado pela Câmara de Aveiro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. O projeto de arquitetura foi formalmente deferido e aprovado pelos serviços de urbanismo da Câmara Municipal de Aveiro. Para o levantamento das licenças de construção é necessário realizar um Aditamento ao Processo — uma formalidade simples, necessária por o projeto ter ultrapassado o prazo máximo obrigatório de 2 anos sem início de obra. Este aditamento é rápido e não coloca em risco a aprovação já concedida.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como funciona o benefício incrível do IVA a 6% na construção desta moradia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A empreitada de construção desta moradia para habitação própria qualifica-se legalmente para a taxa reduzida de IVA a 6%. Em vez de ser tributada à taxa normal de 23%, beneficia de uma redução fiscal direta de 17 pontos percentuais — o que representa menos por volta de 40.000€ no valor de construção em impostos que permanece diretamente na sua conta bancária.',
          },
        },
        {
          '@type': 'Question',
          name: 'Posso escolher o meu próprio construtor? Ou sou obrigado a usar o vosso?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tem total liberdade de escolha do construtor. O projeto pertence a si após a escritura — adjudica a obra a quem quiser. Se precisar, podemos apresentar parceiros de confiança (nomeadamente o Grupo Freitas Renovações) com orçamentos detalhados para Betão Armado ou LSF.',
          },
        },
        {
          '@type': 'Question',
          name: 'As infraestruturas estão mesmo todas à porta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Confirmado. A rua já está asfaltada com passeio, iluminação pública, e as ligações às redes de água, saneamento, eletricidade e fibra ótica já chegam à extremidade do lote. Não há extensões de redes nem obras de urbanização a pagar.',
          },
        },
        {
          '@type': 'Question',
          name: 'O valor de 55.000€ é realmente negociável?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Estamos abertos a analisar propostas sérias de compradores com perfil validado ou disponibilidade para escritura rápida. Peça-nos contacto e conversamos sem compromisso.',
          },
        },
      ],
    },
  ],
};

export default function TerrenosPage() {
  return (
    <>
      {/* Dados Estruturados Schema.org para Motores de Busca */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/*
          SEQUÊNCIA COMPLETA OTIMIZADA PARA CONVERSÃO IMOBILIÁRIA:
          ─────────────────────────────────────────────────────────────
          1. Header & Hero          → Pre-scroll aesthetic, qualificação imediata, benefício IVA 6%
          2. Galeria Curada        → Fotos aéreas profissionais do terreno e zona
          3. Localização & Mapa   → Prova de proximidade (7 min de Aveiro)
          4. O Projeto Aprovado   → Renders, Planta 2D, Planta 3D, LSF/Betão
          5. Especificações Técnicas → Ficha técnica rigorosa após o projeto + IVA a 6%
          6. Tabela de Preços     → Justificação transparente do valor 55k + poupança IVA
          7. Comparativo           → Diferenciação vs terreno comum do mercado
          8. Vídeos               → Credibilidade com vídeos profissionais
          9. FAQ                   → Eliminação de objeções + nota sobre IVA e aditamento
          10. Formulário           → Captura de lead + WhatsApp + backlink Grupo Freitas
        */}

        {/* 1 ── HERO (Pre-Scroll de Alto Padrão) */}
        <TerrenosHero />

        {/* 2 ── GALERIA CURADA */}
        <TerrenosGallery />

        {/* 3 ── LOCALIZAÇÃO & MAPA */}
        <TerrenosLocation />

        {/* 4 ── O PROJETO APROVADO (Renders + Plantas 2D & 3D + LSF/Betão) */}
        <TerrenosProject />

        {/* 5 ── ESPECIFICAÇÕES TÉCNICAS (Imediatamente após o Projeto) */}
        <TerrenosDetails />

        {/* 6 ── TABELA DE PREÇOS — JUSTIFICAÇÃO DOS 55.000€ */}
        <TerrenosPricing />

        {/* 7 ── COMPARATIVO VS MERCADO */}
        <TerrenosComparison />

        {/* 8 ── VÍDEOS PROFISSIONAIS */}
        <TerrenosVideo />

        {/* 9 ── PERGUNTAS FREQUENTES */}
        <TerrenosFaq />

        {/* 10 ── FORMULÁRIO — QUERO SER CONTACTADO */}
        <TerrenosForm />

        {/* ── FOOTER ── */}
        <footer className="terrenos-footer">
          <div className="terrenos-footer-inner">
            <p className="terrenos-footer-copy">
              © {new Date().getFullYear()} André Queirós · Quintãs, Oliveirinha, Aveiro
            </p>
            <p className="terrenos-footer-contact">
              Contacto direto:{' '}
              <a href="tel:+351920601070" className="terrenos-footer-link">
                +351 920 601 070
              </a>
            </p>
            <p className="terrenos-footer-partner">
              Parceiro Construtivo:{' '}
              <a
                href="https://grupofreitasrenovacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="terrenos-footer-link"
              >
                grupofreitasrenovacoes.pt
              </a>
            </p>
            <p className="terrenos-footer-legal">
              Anúncio de venda direta de lote de terreno urbano com projeto de arquitetura aprovado e
              enquadramento em regime fiscal favorável de IVA a 6%. Os dados introduzidos no formulário
              são utilizados exclusivamente para contacto direto com o proprietário.
            </p>
          </div>
        </footer>
      </main>

      {/* ─── STICKY BAR (Mobile) ──── */}
      <TerrenosStickyBar />

      {/* ─── BOTÃO WHATSAPP FLUTUANTE ──── */}
      <TerrenosWhatsAppButton />
    </>
  );
}
