import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import axios from "axios";
import generateUrl from "../../../../contants/url";
import { FullExchangeInterafce } from "../interfaces/FullExchangeInterface";
import ExhcnageDetailContainer from "./exhcnage-detail-data-components/ExhcnageDetailContainer";
import { exchnageStatus } from "../helpers/ExchnageStatus";
import CreateUpdateExchange from "./create-update-exchnage-components/CreateUpdateExchange";
import { ExchangeSimpleInterface } from "../interfaces/ExchnageSImpleInterFace";

function ExchangeDetail({
  exchangeDetail,
  setExchangeDetail,
  setExchanges,
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

  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;
}) {
  const userId = useSelector((state: RootState) => state.user.id);
  const [fullExchange, setFullExchnage] = useState<FullExchangeInterafce>();
  const [isUpdatingExhcnage, setIsUpdatingExhcnage] = useState<boolean>(false);
  const fetchFullExchnage = async () => {
    const { data } = await axios.post(
      generateUrl("exchange/get-full-exchange"),
      { userId: userId, id: exchangeDetail?.activeExchangeId },
      { withCredentials: true }
    );
    setFullExchnage(data);
  };

  useEffect(() => {
    fetchFullExchnage();
  }, [exchangeDetail, isUpdatingExhcnage]);

  return (
    <div>
      <div className="w-full h-28 flex justify-around flex-col">
        <h1 className="font-semibold ml-8">
          {isUpdatingExhcnage ? "Updating exhcnage" : "Exchange Detail"}
        </h1>
        <button
          onClick={() => {
            if (isUpdatingExhcnage) {
              setIsUpdatingExhcnage(false);
            } else {
              setExchangeDetail({
                activeExchangeId: 0,
                seeDetail: false,
              });
            }
          }}
          type="button"
          className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back
        </button>

        {fullExchange?.exchangeState === exchnageStatus.reserved && (
          <button
            onClick={() => {
              setIsUpdatingExhcnage(!isUpdatingExhcnage);
            }}
            type="button"
            className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update exchange
          </button>
        )}
      </div>

      {isUpdatingExhcnage ? (
        <div>
          <CreateUpdateExchange
            setIsUpdatingExhcnage={setIsUpdatingExhcnage}
            setExchanges={setExchanges}
            fullExchange={fullExchange}
            isUpdating={true}
          />
        </div>
      ) : (
        <ExhcnageDetailContainer fullExchange={fullExchange} />
      )}
    </div>
  );
}

export default ExchangeDetail;
