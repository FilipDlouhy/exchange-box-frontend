import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const CreateExchangeMap = ({
  handleCoordinatesChange,
  centers = [],
}: {
  handleCoordinatesChange: (lat: number, lng: number) => void;
  centers?: CenterInterface[];
}) => {
  const defaultCenter =
    centers.length > 0 ? [centers[0].latitude, centers[0].longitude] : [0, 0];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "400px", width: "80%" }}
      className="mx-auto"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {centers.map((center, index) => (
        <Marker
          key={index}
          position={[center.longitude, center.latitude]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              handleCoordinatesChange(center.latitude, center.longitude);
            },
          }}
        >
          <Popup>{"Your echange is set to be here"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CreateExchangeMap;
