import {
  DocumentMagnifyingGlassIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect } from "react";
import generateUrl from "../../../contants/url";
import { ExchangeSimpleInterface } from "./Interfaces/ExchnageSImpleInterFace";

export default function Exchanges({
  setIsCreating,
  exchages,
  setExchanges,
}: {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  exchages: ExchangeSimpleInterface[] | undefined;
  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
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
      {exchages?.map((exchage, index) => (
        <div key={index} className="h-56 w-80 m-5">
          <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {exchage.exhcnageName}
                  </h3>
                </div>
                <p className="mt-1 truncate text-sm ">
                  Number of items in exchange is {exchage.numberOfItems}
                </p>

                {exchage.pickUpDate && (
                  <p className="text-wrap">
                    Pick Up Date: {exchage.pickUpDate.toDateString()}
                  </p>
                )}
              </div>
              {exchage.friendImgUrl ? (
                <img
                  className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                  src={exchage.friendImgUrl}
                  alt=""
                />
              ) : (
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
                  <UserCircleIcon />
                </div>
              )}
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <p className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <DocumentMagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    See detail
                  </p>
                </div>
                <div className="-ml-px cursor-pointer flex w-0 flex-1">
                  <p className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <TrashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
