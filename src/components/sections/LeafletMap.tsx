"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LeafletMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
  height?: number;
}

function MapRecenter({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <button
        type="button"
        onClick={() => map.flyTo([lat, lng], zoom, { duration: 1.2 })}
        title="Pusatkan ke lokasi acara"
        style={{
          background: "rgba(22, 22, 22, 0.88)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(201, 169, 110, 0.45)",
          color: "#C9A96E",
          padding: "6px 12px",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: "0.74rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 5,
          boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
          transition: "all 0.2s ease",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
        Pusatkan
      </button>
    </div>
  );
}

function MapUpdater({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  return null;
}

export default function LeafletMap({
  lat,
  lng,
  name,
  address,
  height = 320,
}: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix Leaflet default icon path issues in Next.js Turbopack HMR environment
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    setMounted(true);
  }, []);

  // Custom luxury gold pin marker with animated radar pulse
  const customIcon = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div style="
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <!-- Animated pulse ring -->
          <div style="
            position: absolute;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(201, 169, 110, 0.45);
            animation: leaflet-pulse 2s infinite ease-out;
            pointer-events: none;
          "></div>
          <!-- Pin drop -->
          <div style="
            position: relative;
            z-index: 2;
            width: 34px;
            height: 34px;
            background: linear-gradient(135deg, #DFCA9B 0%, #C9A96E 50%, #9E7D3B 100%);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #FFFFFF;
            box-shadow: 0 6px 18px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 9px;
              height: 9px;
              background: #FFFFFF;
              border-radius: 50%;
              transform: rotate(45deg);
              box-shadow: 0 1px 3px rgba(0,0,0,0.4);
            "></div>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 38],
      popupAnchor: [0, -38],
    });
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height,
          width: "100%",
          borderRadius: 16,
          background: "linear-gradient(135deg, #1A1A1A, #121212)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          border: "1px solid rgba(201, 169, 110, 0.25)",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            border: "2px solid rgba(201, 169, 110, 0.3)",
            borderTopColor: "#C9A96E",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#C9A96E", margin: 0 }}>
          Memuat citra satelit medan...
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height, borderRadius: 16, overflow: "hidden" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        style={{ height: "100%", width: "100%", borderRadius: 16 }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        {/* Satelit Medan: Esri World Imagery (Base) + World Boundaries and Places (Roads & Labels Overlay) */}
        <TileLayer
          key="esri-imagery"
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        <TileLayer
          key="esri-places-overlay"
          attribution="&copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />

        {/* Marker & Popup */}
        {customIcon && (
          <Marker position={[lat, lng]} icon={customIcon}>
            <Popup className="custom-leaflet-popup">
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textAlign: "center",
                  padding: "0.4rem 0.2rem",
                  minWidth: 170,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(201, 169, 110, 0.15)",
                    color: "#C9A96E",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 4,
                    marginBottom: "0.4rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Lokasi Acara
                </span>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "#F5F0E6",
                    margin: "0 0 0.35rem",
                    lineHeight: 1.3,
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "#D1CCC2",
                    lineHeight: 1.4,
                    margin: "0 0 0.6rem",
                  }}
                >
                  {address}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    background: "linear-gradient(135deg, #C9A96E 0%, #A6874E 100%)",
                    color: "#161616",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "5px 12px",
                    borderRadius: 6,
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(201, 169, 110, 0.3)",
                  }}
                >
                  Petunjuk Arah &rarr;
                </a>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Map Recenter & Auto-Center */}
        <MapUpdater lat={lat} lng={lng} zoom={16} />
        <MapRecenter lat={lat} lng={lng} zoom={16} />
      </MapContainer>
    </div>
  );
}
