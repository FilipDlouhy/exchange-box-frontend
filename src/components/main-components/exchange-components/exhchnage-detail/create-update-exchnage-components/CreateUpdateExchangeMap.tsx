import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { CreateUpdateExchangeMapProps } from "../props/ExchnageCreateUpdateProps";
import { CenterInterface } from "../../interfaces/CenterInterFace";

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CreateUpdateExchangeMap = ({
  handleCoordinatesChange,
  size,
  centers = [],
  centerLong,
  centerLat,
  isUpdating,
}: CreateUpdateExchangeMapProps) => {
  const defaultCenter = [centerLong, centerLat];
  const markerRefs = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (isUpdating) {
      setTimeout(() => {
        const targetIndex = centers.findIndex(
          (center) =>
            center.latitude === centerLat && center.longitude === centerLong
        );
        if (targetIndex !== -1 && markerRefs.current[targetIndex]) {
          const currentCenter: CenterInterface = centers[targetIndex];
          handleCoordinatesChange(currentCenter);
          markerRefs.current[targetIndex].openPopup();
        }
      }, 500);
    }
  }, [isUpdating, centerLat, centerLong, centers]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "400px", width: "80%" }}
      className="mx-auto"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {centers.map((center, index) => {
        const sizeBoxes = `numberOf${size}Boxes`;
        const sizeBoxesTotal = `numberOf${size}BoxesTotal`;
        if (
          center.front[sizeBoxes as keyof typeof center.front] <
          center.front[sizeBoxesTotal as keyof typeof center.front]
        ) {
          return (
            <Marker
              key={index}
              position={[center.longitude, center.latitude]}
              icon={customIcon}
              ref={(ref) => (markerRefs.current[index] = ref)}
              eventHandlers={{
                click: () => {
                  const foundCenter = centers.find(
                    (c) =>
                      c.latitude === center.latitude &&
                      c.longitude === center.longitude
                  );
                  handleCoordinatesChange(foundCenter);
                },
              }}
            >
              <Popup>Your exchange is set to be here</Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default CreateUpdateExchangeMap;
