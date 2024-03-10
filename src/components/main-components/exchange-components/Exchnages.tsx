import axios from "axios";
import { useEffect } from "react";
import generateUrl from "../../../contants/url";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import ExhcnagesItems from "./exhchnage-detail/ExhcnagesItems";

export default function Exchanges({
  setIsCreating,
  exchages,
  setExchanges,
  setExchangeDetail,
}: {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  exchages: ExchangeSimpleInterface[] | undefined;
  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;

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
  const fetchData = async () => {
    try {
      const response = await axios.get(
        generateUrl("exchange/get-user-exchanges"),
        { withCredentials: true }
      );
      const dataWithDates = response.data.map(
        (exchage: ExchangeSimpleInterface) => ({
          ...exchage,
          pickUpDate: exchage.pickUpDate ? new Date(exchage.pickUpDate) : null,
        })
      );
      setExchanges(dataWithDates);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap  m-2">
      <div className="w-full h-28  flex justify-around  flex-col">
        <h1 className="font-semibold ml-8">Exchanges</h1>
        <button
          onClick={() => {
            setIsCreating(true);
          }}
          type="button"
          className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Exchange
        </button>
      </div>
      <ExhcnagesItems
        setExchangeDetail={setExchangeDetail}
        exchages={exchages}
      />
    </div>
  );
}
