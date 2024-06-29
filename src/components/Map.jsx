import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, lng, src }) => {

  const customMarkerIcon = L.icon({
    iconUrl:  src, 
    iconSize: [45, 45], 
    iconAnchor: [25, 50], 
    popupAnchor: [0, -32] 
  });

  useEffect(() => {
    const map = L.map("map", {
      center: [lat, lng],
      zoom: 6,
      layers: [
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=3b3599e6-23af-49db-a472-72a888887948",
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom:8,
            maxZoom:50,
          }
        ),
      ],
    });

    // Add a marker with custom icon to the map
    const marker = L.marker([lat, lng], { icon: customMarkerIcon }).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return <div id="map" />;
};

export default Map;
