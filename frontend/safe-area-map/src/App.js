import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons for risk levels
const greenIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  iconSize: [30, 30],
});
const yellowIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
  iconSize: [30, 30],
});
const redIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/463/463612.png",
  iconSize: [30, 30],
});

// Function to get icon from risk level
const getIconForRisk = (risk) => {
  if (risk === "Safe") return greenIcon;
  if (risk === "Moderate") return yellowIcon;
  if (risk === "Dangerous") return redIcon;
  return greenIcon; // default
};

export default function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Replace with your backend URL, for now localhost FastAPI assumes running on 8000
    fetch("http://localhost:8000/map/risks")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error("Error fetching risk data:", err));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🛡️ TRANA Safety Map</h1>
      <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: "90vh", width: "100%" }}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution="© OpenStreetMap contributors" 
        />
        {alerts.map(({ id, location, risk_level, coords, timestamp }) => (
          <Marker
            key={id}
            position={coords || [12.9716, 77.5946]} // fallback coords if none provided
            icon={getIconForRisk(risk_level)}
          >
            <Popup>
              <strong>{location}</strong><br />
              Risk Level: {risk_level}<br />
              {timestamp && `Time: ${new Date(timestamp).toLocaleString()}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
