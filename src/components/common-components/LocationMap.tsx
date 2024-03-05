import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMap = ({
  position,
  handleCoordinatesChange,
}: {
  position: [number, number] | null | undefined;
  handleCoordinatesChange: (lat: number, lng: number) => void;
}) => {
  const [positionLocal, setPosition] = useState<[number, number]>(position);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        handleCoordinatesChange(lat, lng);
        setPosition([lat, lng]);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={positionLocal}
      zoom={13}
      style={{ height: "400px", width: "80%" }}
      className="mx-auto"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />
      {positionLocal && (
        <Marker position={positionLocal} icon={customIcon}>
          <Popup>You are here!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default LocationMap;
