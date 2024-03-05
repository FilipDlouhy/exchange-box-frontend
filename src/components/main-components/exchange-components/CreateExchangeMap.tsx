import { useEffect, useState } from "react";
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
import { CenterInterface } from "./Interfaces/CenterInterFace";

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "path/to/red/marker-icon.png",
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CreateExchangeMap = ({
  handleCoordinatesChange,
  centers = [],
}: {
  handleCoordinatesChange: (lat: number, lng: number) => void;
  centers?: CenterInterface[];
}) => {
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        handleCoordinatesChange(lat, lng);
      },
    });
    return null;
  };

  const handleMarkerClick = () => {
    return { icon: redIcon };
  };

  return (
    <MapContainer
      center={[centers[0].longitude, centers[0].latitude] || [0, 0]}
      zoom={13}
      style={{ height: "400px", width: "80%" }}
      className="mx-auto"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />
      <Marker
        position={[centers[0].longitude, centers[0].latitude]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      >
        <Popup>You are here!</Popup>
      </Marker>

      {centers.map((center, index) => (
        <Marker
          key={index}
          position={[center.longitude, center.latitude]}
          icon={customIcon}
          eventHandlers={{
            click: handleMarkerClick,
          }}
        >
          <Popup>{"Center"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CreateExchangeMap;
