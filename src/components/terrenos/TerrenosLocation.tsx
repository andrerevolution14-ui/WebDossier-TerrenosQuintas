'use client';

import { scrollToForm } from '@/lib/scrollToForm';

const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=40.5829732,-8.6175628&t=m&z=17&output=embed';


const distances = [
  { icon: '🛒', label: 'Glicínias Plaza', value: '7 min', detail: 'Principal centro comercial de Aveiro (N109 s/ portagens)' },
  { icon: '🏙️', label: 'Centro de Aveiro', value: '7 min', detail: 'Acesso rápido e direto sem trânsito urbano' },
  { icon: '🛣️', label: 'Acesso A25 & A17', value: '5 min', detail: 'Ligação direta e desimpedida à autoestrada' },
  { icon: '🎓', label: 'Universidade de Aveiro', value: '8 min', detail: 'Polo universitário e centros tecnológicos' },
  { icon: '🏥', label: 'Hospital de Aveiro', value: '8 min', detail: 'Infraestruturas de saúde e clínicas' },
  { icon: '🏖️', label: 'Praias da Barra e Costa Nova', value: '18 min', detail: 'Acesso rápido à marginal e oceano' },
];

export default function TerrenosLocation() {
  return (
    <section className="t-section" id="localizacao">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">📍 / LOCALIZAÇÃO ESTRATÉGICA EM AVEIRO</p>
          <h2 className="t-heading">
            🚗 A 7 Minutos do Glicínias Plaza,<br />
            <span style={{ color: '#059669' }}>no Sossego Exclusivo de Quintãs</span>
          </h2>
          <p className="t-section-sub">
            A <strong>7 minutos</strong> do Glicínias Plaza e dos principais eixos de Aveiro, com a privacidade de uma zona residencial de moradias.
          </p>
        </div>

        <div className="t-location-grid">
          {/* Map */}
          <div className="t-map-wrap">
            <div className="t-map-badge">
              <span>📍</span>
              <span>Rua Acácio Simões Vieira · Quintãs, Oliveirinha</span>
            </div>
            <iframe
              src={MAPS_EMBED_URL}
              className="t-map-iframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do terreno em Quintãs, Oliveirinha, Aveiro"
            />
            <a
              href="#formulario"
              onClick={scrollToForm}
              className="t-map-link"
              id="cta_ver_mapa"
            >
              <span>📍 Visitar o Terreno no Local</span>
              <span>→</span>
            </a>
          </div>

          {/* Distances */}
          <div className="t-distances">
            <p className="t-distances-title">Distâncias Principais</p>
            <div className="t-distances-list">
              {distances.map((d) => (
                <div key={d.label} className="t-distance-item">
                  <span className="t-distance-icon">{d.icon}</span>
                  <div className="t-distance-body">
                    <span className="t-distance-label">{d.label}</span>
                    <span className="t-distance-detail">{d.detail}</span>
                  </div>
                  <span className="t-distance-value">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="t-location-note">
              <span>🏡</span>
              <p>
                Rua Acácio Simões Vieira — zona tranquila de moradias, <strong>rua asfaltada</strong> e <strong>todas as infraestruturas</strong> prontas à porta.
              </p>
            </div>
          </div>
        </div>

        <div className="t-cta-center" style={{ marginTop: '36px' }}>
          <a
            href="#formulario"
            onClick={scrollToForm}
            id="cta_localizacao_contacto"
            className="t-btn t-btn-cta t-cta-scroll"
          >
            <span>📅 Agendar Visita ao Terreno no Local</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
