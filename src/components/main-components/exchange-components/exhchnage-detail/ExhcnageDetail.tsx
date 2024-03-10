import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ExchangeDetailData from "./ExchnageDetailData";
import ExchangeDetailItems from "./ExchangeDetailItems";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import axios from "axios";
import generateUrl from "../../../../contants/url";
import { FullExchangeInterafce } from "../interfaces/FullExchangeInterface";

const customIcon = new L.DivIcon({
  className: "custom-icon",
  html: "<div style='background-color: #2A81CB; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #FFFFFF;'></div>",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function ExchangeDetail({
  exchangeDetail,
  setExchangeDetail,
}: {
  exchangeDetail:
    | {
        activeExchangeId: number;
        seeDetail: boolean;
      }
    | undefined;
  setExchangeDetail: React.Dispatch<
    React.SetStateAction<
      | {
          activeExchangeId: number;
          seeDetail: boolean;
        }
      | undefined
    >
  >;
}) {
  const userId = useSelector((state: RootState) => state.user.id);
  const [fullExchange, setFullExchnage] = useState<FullExchangeInterafce>();

  const fetchFullExchnage = async () => {
    const { data } = await axios.post(
      generateUrl("exchange/get-full-exchange"),
      { userId: userId, id: exchangeDetail?.activeExchangeId },
      { withCredentials: true }
    );
    console.log(data);
    setFullExchnage(data);
  };

  useEffect(() => {
    fetchFullExchnage();
  }, [exchangeDetail]);

  return (
    <div>
      <div className="w-full h-28 flex justify-around flex-col">
        <h1 className="font-semibold ml-8">Exchange Detail</h1>
        <button
          onClick={() => {
            setExchangeDetail({
              activeExchangeId: 0,
              seeDetail: false,
            });
          }}
          type="button"
          className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back
        </button>
      </div>
      <div className="w-full flex items-center justify-center flex-wrap">
        <ExchangeDetailData fullExchange={fullExchange} />
      </div>

      {fullExchange && (
        <div className="w-full my-5 flex justify-center items-center">
          <MapContainer
            center={[fullExchange?.latitude, fullExchange?.longitude]}
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

export default ExchangeDetail;
