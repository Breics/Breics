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
  const center = properties.length > 0
    ? [properties[0].latitude, properties[0].longitude]
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
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((prop) => (
          <Marker
            key={prop.id}
            position={[prop.latitude, prop.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>{prop.title}</strong><br />
              {prop.location}<br />
              ₦{prop.price.toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
