import {
  CheckBadgeIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ExchangeSimpleInterface } from "../interfaces/ExchnageSImpleInterFace";
import { LockOpenIcon } from "@heroicons/react/24/solid";
import { exchnageStatus, statusTexts } from "../helpers/ExchnageStatus";

function ExhcnagesItems({
  exchages,
  setExchangeDetail,
}: {
  exchages: ExchangeSimpleInterface[] | undefined;
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
  const getStatusText = (status: string) => {
    return statusTexts[status];
  };

  return (
    <div className="w-full flex flex-wrap">
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
              <div
                onClick={() => {
                  setExchangeDetail({
                    activeExchangeId: exchage.id,
                    seeDetail: true,
                  });
                }}
                className="cursor-pointer -mt-px flex divide-x divide-gray-200"
              >
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
                  <p className=" text-centerrelative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    {exchage.exchangeState === exchnageStatus.done ? (
                      <CheckBadgeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : exchage.exchangeState === exchnageStatus.unscheduled ? (
                      <ClockIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <LockOpenIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                    {getStatusText(exchage.exchangeState)}
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

export default ExhcnagesItems;
