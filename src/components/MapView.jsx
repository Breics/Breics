import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const MapView = ({ properties }) => {
  // Filter out properties without valid coordinates
  const validProperties = properties.filter(
    (prop) =>
      typeof prop.latitude === 'number' &&
      typeof prop.longitude === 'number' &&
      !isNaN(prop.latitude) &&
      !isNaN(prop.longitude)
  );

  const center = validProperties.length > 0
    ? [validProperties[0].latitude, validProperties[0].longitude]
    : [6.5244, 3.3792]; // Default to Lagos

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden mb-5 relative z-[1]">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validProperties.map((prop) => (
          <Marker
            key={prop._id || prop.id}
            position={[prop.latitude, prop.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>{prop.title}</strong>
              <br />
              {`${prop.location?.address || ''}, ${prop.location?.city || ''}, ${prop.location?.state || ''}, ${prop.location?.country || ''}`}
              <br />
              ₦{prop.price?.toLocaleString() || 'N/A'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
