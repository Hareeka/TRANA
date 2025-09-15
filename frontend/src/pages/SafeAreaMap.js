import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const riskColors = {
  Safe: "green",
  Moderate: "yellow",
  Dangerous: "red",
};

// Custom marker icon factory with color
const createColoredIcon = (color) =>
  new L.Icon({
    iconUrl:
      `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
    iconSize: [21, 34],
    iconAnchor: [10, 34],
  });

export default function SafeAreaMap() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user current geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const radius = 5; // in kms

          // Fetch dynamic risk data from backend with user location
          fetch(`http://localhost:8000/map/risks?lat=${latitude}&lng=${longitude}&radius=${radius}`)
            .then((res) => res.json())
            .then((data) => {
              setAlerts(data);
              setLoading(false);
            })
            .catch((err) => {
              setError("Failed to fetch risk data");
              setLoading(false);
            });
        },
        (err) => {
          setError("Geolocation permission denied or unavailable");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading map data...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <MapContainer center={[20, 78]} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert) => {
        if (!alert.coords || alert.coords[0] === 0 && alert.coords[1] === 0) {
          return null; // Skip invalid coords
        }

        const color = riskColors[alert.risk_level] || "gray";

        return (
          <Marker
            key={alert.id}
            position={[alert.coords[0], alert.coords[1]]}
            icon={createColoredIcon(color)}
          >
            <Popup>
              <strong>{alert.location}</strong>
              <br />
              Risk Level: {alert.risk_level}
              <br />
              Time: {new Date(alert.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
