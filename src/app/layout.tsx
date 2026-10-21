import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0f1a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://terreno.verdemont.eu'),
  title: 'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 €',
  description:
    'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 € (negociável). Projeto de arquitetura aprovado pela Câmara de Aveiro · Aditamento para emissão da licença. Benefício fiscal de IVA a 6% na construção.',
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
    title: 'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 €',
    description:
      'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 € (negociável). Projeto de arquitetura aprovado pela Câmara de Aveiro · Aditamento para emissão da licença.',
    images: [{ url: '/Curado/1.webp', width: 1200, height: 675, alt: 'Lote de Terreno em Quintãs, Oliveirinha, Aveiro' }],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lote de 233 m² com projeto de moradia T3 aprovado · Quintãs, a 7 min de Aveiro · 51.000 €',
    description: 'Lote de 233 m² em Quintãs, Aveiro. Projeto aprovado pela Câmara. 51.000 € Negociável.',
    images: ['/Curado/1.webp'],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preload" as="image" href="/Curado/1.webp" type="image/webp" />

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
              fbq('init', '979841341182458');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=979841341182458&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
