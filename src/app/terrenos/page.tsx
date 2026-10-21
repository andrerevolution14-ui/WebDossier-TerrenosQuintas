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
import TerrenosExitIntent from '@/components/terrenos/TerrenosExitIntent';

export const metadata: Metadata = {
  title: 'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 €',
  description:
    'Lote de 233 m² em Quintãs, Oliveirinha, a 7 min de Aveiro. Projeto de arquitetura aprovado pela Câmara de Aveiro · Aditamento para emissão da licença. Benefício fiscal de IVA a 6% na construção. 51.000 € (Negociável).',
  alternates: {
    canonical: 'https://terreno.verdemont.eu/terrenos',
  },
  openGraph: {
    title: 'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 €',
    description:
      'Lote de 233 m² em Quintãs, Oliveirinha. Projeto de arquitetura aprovado pela Câmara de Aveiro e benefício fiscal de IVA a 6% na construção. 51.000 € (Negociável).',
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
      '@id': 'https://terreno.verdemont.eu/terrenos#listing',
      name: 'Lote de 233 m² com projeto de moradia T3 aprovado em Aveiro',
      description:
        'Lote urbano de 233 m² em Quintãs, Oliveirinha, a 7 min de Aveiro. Projeto de arquitetura aprovado pela Câmara Municipal de Aveiro com benefício fiscal de IVA a 6% na construção da moradia.',
      url: 'https://terreno.verdemont.eu/terrenos',
      datePosted: '2026-09-21',
      offers: {
        '@type': 'Offer',
        price: '51000',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-10-21',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '51000',
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
      '@id': 'https://terreno.verdemont.eu/terrenos#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qual o estado real da aprovação do projeto de arquitetura?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O projeto de arquitetura está formalmente aprovado pela Câmara Municipal de Aveiro. Como decorreram mais de 2 anos sem o início físico da obra, é unicamente necessário efetuar o aditamento administrativo para emissão da licença de construção com os termos de responsabilidade das especialidades (conforme previsto no regime Simplex). Não existe risco de indeferimento arquitetónico.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como funciona o benefício fiscal do IVA a 6% na construção da moradia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A empreitada de construção de moradia para habitação própria permanente beneficia da taxa reduzida de IVA a 6% em vez da taxa normal de 23%. Esta poupança de 17 pontos percentuais representa uma poupança líquida de cerca de 35.000€ a 40.000€ no orçamento de obra.',
          },
        },
        {
          '@type': 'Question',
          name: 'Este lote pode ser comprado com a moradia construída chave na mão?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Este lote pode ser adquirido só com o projeto de arquitetura aprovado (51.000 € negociável) para construir com o seu próprio empreiteiro, ou com a moradia construída chave na mão (335.000 €).',
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
          name: 'O valor de 51.000 € é realmente negociável?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Estamos abertos a analisar propostas sérias de compradores com perfil validado ou disponibilidade para escritura rápida. Trata-se de uma venda direta com o proprietário, sem intermediários.',
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
          6. Tabela de Preços     → Justificação transparente do valor 51k + poupança IVA
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

        {/* 6 ── TABELA DE PREÇOS — JUSTIFICAÇÃO DOS 51.000€ */}
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

      {/* ─── POPUP DE INTENÇÃO DE SAÍDA (EXIT-INTENT) ──── */}
      <TerrenosExitIntent />
    </>
  );
}
