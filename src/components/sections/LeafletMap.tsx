"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LeafletMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
  height?: number;
}

export default function LeafletMap({
  lat,
  lng,
  name,
  address,
  height = 300,
}: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix Leaflet default icon path issues in Next.js/Turbopack HMR environment
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    setMounted(true);
  }, []);

  // Custom gold pin marker
  const customIcon = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #C9A96E 0%, #B8934A 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2.5px solid #FFFFFF;
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -40],
    });
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height,
          width: "100%",
          borderRadius: 14,
          background: "linear-gradient(135deg, #F5F0E8, #EAE8E7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#C9A96E" }}>
          Memuat peta...
        </p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height, width: "100%", borderRadius: 14 }}
      scrollWheelZoom={false}
      attributionControl={true}
    >
      {/* Carto Voyager clean tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {customIcon && (
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div style={{ fontFamily: "'Inter', sans-serif", textAlign: "center", padding: "0.4rem" }}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#2D3748",
                  marginBottom: "0.2rem",
                }}
              >
                {name}
              </p>
              <p style={{ fontSize: "0.75rem", color: "#718096", lineHeight: 1.4 }}>
                {address}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
