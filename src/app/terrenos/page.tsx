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
  openGraph: {
    title: 'Lote c/ Projeto Aprovado e IVA a 6% na Construção | 55.000€ Negociável',
    description:
      'Lote 233m² em Quintãs, Oliveirinha. Projeto Aprovado pela Câmara e benefício de taxa reduzida de IVA a 6% na construção.',
    images: [{ url: '/Curado/2.png', width: 1200, height: 675, alt: 'Terreno Quintãs Oliveirinha Aveiro com Projeto Aprovado' }],
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function TerrenosPage() {
  return (
    <>
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
