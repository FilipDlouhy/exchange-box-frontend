import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { CenterInterface } from "./interfaces/CenterInterFace";

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
  handleCoordinatesChange: (center: CenterInterface | undefined) => void;
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
              const targetLatitude = center.latitude;
              const targetLongitude = center.longitude;
              const foundCenter = centers.find(
                (center) =>
                  center.latitude === targetLatitude &&
                  center.longitude === targetLongitude
              );

              handleCoordinatesChange(foundCenter);
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
