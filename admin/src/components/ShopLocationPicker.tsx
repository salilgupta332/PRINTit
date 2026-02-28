import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  lat: number | null;
  lng: number | null;
  onLocationChange: (lat: number, lng: number) => void;
}

export default function ShopLocationPicker({
  lat,
  lng,
  onLocationChange,
}: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!lat && !lng && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(coords);
        onLocationChange(coords[0], coords[1]);
      });
    } else if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
        setPosition(coords);
        onLocationChange(coords[0], coords[1]);
      },
    });

    return position ? (
      <>
        <Marker
          position={position}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const latLng = marker.getLatLng();
              const coords: [number, number] = [latLng.lat, latLng.lng];
              setPosition(coords);
              onLocationChange(coords[0], coords[1]);
            },
          }}
        />
        <Circle center={position} radius={5000} /> {/* 5km radius */}
      </>
    ) : null;
  }

  if (!position) return <div>Detecting location...</div>;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
