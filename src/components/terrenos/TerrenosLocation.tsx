'use client';

const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=40.5829732,-8.6175628&t=m&z=17&output=embed';
const MAPS_DIRECT_URL =
  'https://www.google.com/maps/place/R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha/@40.5829772,-8.6201377,825m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd23a309bf3e3e43:0xf3d6a6bf7615447e!8m2!3d40.5829732!4d-8.6175628!16s%2Fg%2F11q223zjf_?entry=ttu';

const distances = [
  { icon: '🏙️', label: 'Centro de Aveiro', value: '7 min', detail: 'via N109' },
  { icon: '🛣️', label: 'Acesso A25', value: '5 min', detail: 'ligação rápida à autoestrada' },
  { icon: '🛒', label: 'Supermercados', value: '3 min', detail: 'Pingo Doce, Lidl na zona' },
  { icon: '🏫', label: 'Escolas & Serviços', value: '5 min', detail: 'infraestruturas completas' },
  { icon: '🚂', label: 'Estação de Aveiro', value: '12 min', detail: 'ligação a Porto e Lisboa' },
  { icon: '🏖️', label: 'Praia de Aveiro', value: '20 min', detail: 'Barra e Costa Nova' },
];

export default function TerrenosLocation() {
  return (
    <section className="t-section" id="localizacao">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">Localização Premium</p>
          <h2 className="t-heading">
            A 7 Minutos de Aveiro,<br />
            <span style={{ color: 'var(--t-beige-dark)' }}>no Sossego de Quintãs</span>
          </h2>
          <p className="t-section-sub">
            Zona residencial tranquila com todas as infraestruturas, sem o caos urbano do centro.
            O melhor dos dois mundos.
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
              href={MAPS_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-map-link"
              id="cta_ver_mapa"
            >
              <span>Abrir Rota no Google Maps</span>
              <span>↗</span>
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
                Rua Acácio Simões Vieira, Quintãs — zona residencial consolidada com moradias vizinhas,
                rua asfaltada, iluminação pública e todas as infraestruturas instaladas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
