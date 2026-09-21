import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0f1a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://terrenosaveiro.pt'),
  title: 'Terrenos c/ Projeto Aprovado em Aveiro | Quintãs, Oliveirinha | 55.000€',
  description:
    'Lotes urbanos de 233m² em Quintãs, Oliveirinha, a 7 minutos do centro de Aveiro. Projeto de Arquitetura 100% Aprovado pela Câmara. Construa já sem esperar 1 a 2 anos de burocracia. 55.000€ (Negociável).',
  keywords: [
    'terreno Aveiro',
    'lote Aveiro',
    'terreno Oliveirinha',
    'lote com projeto aprovado',
    'terreno Quintãs',
    'comprar terreno Aveiro',
    'construir moradia Aveiro',
    'lote urbano Aveiro',
  ],
  authors: [{ name: 'André Queirós' }],
  openGraph: {
    title: 'Lote com Projeto Aprovado a 7 min de Aveiro | 55.000€',
    description:
      'Lote de 233m² em Quintãs, Oliveirinha. Projeto de Arquitetura 100% Aprovado pela Câmara. Construa já, sem esperar 2 anos em burocracia.',
    images: [{ url: '/Curado/1.png', width: 1200, height: 675, alt: 'Terreno Quintãs Oliveirinha Aveiro' }],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lote com Projeto Aprovado a 7 min de Aveiro | 55.000€',
    description: 'Lote de 233m² em Quintãs, Oliveirinha. Projeto 100% Aprovado. 55.000€ Negociável.',
    images: ['/Curado/1.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="format-detection" content="telephone=no" />

        {/* ─── Meta Pixel Code ────────────────────────────────────────── */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '26022738390737044');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=26022738390737044&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
