'use client';
import React, { useState } from 'react';
import { trackWhatsAppLead } from '@/lib/analytics';

// ─── WhatsApp Config — 920601070 ──────────────────────────────────────────
export const WA_PHONE = '351920601070';
export const WA_BASE  = `https://api.whatsapp.com/send?phone=${WA_PHONE}`;

// Mensagem automática unificada para todos os botões de contacto
const WA_MSG = encodeURIComponent(
  'Olá André! Vi o lote de terreno em Quintãs (Aveiro) e gostaria de obter mais informações sobre o projeto. Podemos falar?'
);

export const WA_VISIT   = `${WA_BASE}&text=${WA_MSG}`;
export const WA_MANAGER = `${WA_BASE}&text=${WA_MSG}`;
export const WA_CREDIT  = `${WA_BASE}&text=${WA_MSG}`;
export const WA_GENERIC = `${WA_BASE}&text=${WA_MSG}`;
export const WA_DOSSIER = `${WA_BASE}&text=${WA_MSG}`;

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS = [
    ['#galeria', 'Galeria'],
    ['#videos', 'Vídeos 3D'],
    ['#plantas', 'Plantas'],
    ['#localizacao', 'Localização'],
    ['#credito', 'Crédito Gratuito'],
    ['#condicoes', 'Valores'],
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(5, 7, 12, 0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <a href="#topo" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1 }}>
            Domaine XXV
          </div>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: 3 }}>
            Oliveirinha · Aveiro
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="site-nav-desktop">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.78)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.78)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="site-nav-desktop" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 2,
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 1, background: 'var(--gold-light)' }} />
            2 Lotes Disponíveis
          </div>

          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header-cta-desktop"
            onClick={() => trackWhatsAppLead('header_desktop_visita')}
            style={{
              flexShrink: 0,
              alignItems: 'center',
              gap: 6,
              background: 'var(--gold)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '9px 18px',
              borderRadius: 'var(--radius-btn)',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(161, 118, 40, 0.2)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Marcar Visita →</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Menu de Navegação"
            className="site-menu-mobile-btn"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 3,
              width: 38,
              height: 38,
              cursor: 'pointer',
              color: '#FFFFFF',
              fontSize: '1.2rem',
              lineHeight: 1,
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(5, 7, 12, 0.98)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                padding: '6px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppLead('header_mobile_drawer_visita');
              setMobileMenuOpen(false);
            }}
            className="btn btn-gold"
            style={{ marginTop: 8, width: '100%', fontSize: '0.86rem', borderRadius: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}
          >
            Marcar Visita ao Terreno →
          </a>
        </div>
      )}
    </header>
  );
}
