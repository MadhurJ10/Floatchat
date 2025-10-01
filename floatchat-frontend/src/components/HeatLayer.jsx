import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const HeatLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heat = L.heatLayer(
      points.map((p) => [
        p.latitude,
        p.longitude,
        Math.max((p.temperature ?? 0) / 30, 0.05), // scale & prevent zero
      ]),
      {
        radius: 40,   // was 90
        blur: 10,     // was 15
        maxZoom: 17,
        gradient: {
          0.0: "#330000",
          0.3: "#660000",
          0.6: "#990000",
          0.8: "#cc0000",
          1.0: "#ff0000",
        },
      }
    ).addTo(map);

    return () => map.removeLayer(heat);
  }, [map, points]);

  return null;
};

export default HeatLayer;
