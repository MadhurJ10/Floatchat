import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import HeatLayer from "./HeatLayer";
import { MapDataContext } from "../context/MapDataProvider";

// fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LeafletMap = () => {
  const { data } = useContext(MapDataContext);

  // if data isn't ready or not an array
  console.log(data)
  if (!Array.isArray(data) ) {

    return <p style={{ color: "gray" }}>Loading map data…</p>;
  }

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer
        center={[20.123, 72.456]}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <HeatLayer points={data} />

        {data.map((item) => (
          <Marker
            key={item.profile_id}
            position={[item.latitude, item.longitude]}
          >
            <Popup>
              <div>
                <p><strong>Profile ID:</strong> {item.profile_id}</p>
                <p><strong>Depth:</strong> {item.depth_lev} m</p>
                <p><strong>Pressure:</strong> {item.pressure} dbar</p>
                <p><strong>Temperature:</strong> {item.temperature} °C</p>
                <p><strong>Salinity:</strong> {item.salinity} PSU</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
