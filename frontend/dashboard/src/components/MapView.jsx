import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

// Fix default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ geoPoints = [], clusters = [], summary = {} }) => {
  // Calculate center from points
  const getCenter = () => {
    if (geoPoints.length === 0) return [20.5937, 78.9629]; // India center as default

    const avgLat = geoPoints.reduce((sum, point) => sum + point.lat, 0) / geoPoints.length;
    const avgLon = geoPoints.reduce((sum, point) => sum + point.lon, 0) / geoPoints.length;
    return [avgLat, avgLon];
  };

  const center = getCenter();

  // Create custom marker icons based on risk score
  const getMarkerColor = (riskScore) => {
    if (riskScore >= 70) return '#ef4444'; // Red - High risk
    if (riskScore >= 40) return '#f59e0b'; // Orange - Medium risk
    return '#10b981'; // Green - Low risk
  };

  const createCustomIcon = (riskScore) => {
    const color = getMarkerColor(riskScore);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={geoPoints.length > 1 ? 8 : 10}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render markers for each location */}
        {geoPoints.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lon]}
            icon={createCustomIcon(summary.risk_score || 50)}
          >
            <Popup>
              <div className="popup-content">
                <h3>{point.name}</h3>
                <p><strong>Location:</strong> {point.name}</p>
                <p><strong>Coordinates:</strong> {point.lat.toFixed(4)}, {point.lon.toFixed(4)}</p>
                <p><strong>Risk Score:</strong> {summary.risk_score || 'N/A'}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render risk radius circles if available */}
        {geoPoints.map((point, index) => (
          <Circle
            key={`circle-${index}`}
            center={[point.lat, point.lon]}
            radius={10000} // 10km radius
            pathOptions={{
              color: getMarkerColor(summary.risk_score || 50),
              fillColor: getMarkerColor(summary.risk_score || 50),
              fillOpacity: 0.1,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
