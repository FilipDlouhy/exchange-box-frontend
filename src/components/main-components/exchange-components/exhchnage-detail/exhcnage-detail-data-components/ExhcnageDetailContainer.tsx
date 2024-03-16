import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ExchangeDetailItems from "./ExchangeDetailItems";
import ExchangeDetailData from "./ExchnageDetailData";
import L from "leaflet";
import { FullExchangeInterafce } from "../../interfaces/FullExchangeInterface";
const customIcon = new L.DivIcon({
  className: "custom-icon",
  html: "<div style='background-color: #2A81CB; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #FFFFFF;'></div>",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function ExhcnageDetailContainer({
  fullExchange,
}: {
  fullExchange: FullExchangeInterafce | undefined;
}) {
  return (
    <div>
      <div className="w-full flex items-center justify-center flex-wrap">
        <ExchangeDetailData fullExchange={fullExchange} />
      </div>

      {fullExchange && (
        <div className="w-full my-5 flex justify-center items-center">
          <MapContainer
            center={[fullExchange?.longitude, fullExchange?.latitude]}
            zoom={13}
            style={{ height: "400px", width: "80%" }}
            className="mx-auto"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[fullExchange?.longitude, fullExchange?.latitude]}
              icon={customIcon}
            >
              <Popup>{"Your exchange is set to be here."}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <ExchangeDetailItems items={fullExchange?.items} />
    </div>
  );
}

export default ExhcnageDetailContainer;
