import {
  CheckBadgeIcon,
  DocumentMagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import { LockOpenIcon } from "@heroicons/react/24/solid";
import { exchnageStatus } from "./helpers/ExchnageStatus";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { setOpenBoxCode } from "../../../store/echange-state/openBoxCodeSlice";
import { showError } from "../../../store/errorSlice";
import { showInfo } from "../../../store/infoSlice";

function ExhcnagesItems({
  exchages,
  setExchangeDetail,
  setOpen,
  setExchanges,
}: {
  setOpen: React.Dispatch<
    React.SetStateAction<{
      showOpenBoxForm: boolean;
      exchnageId: number;
      userId: number;
    }>
  >;
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
  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;
}) {
  const dispatch = useDispatch();
  const getStatusText = (status: string): string | undefined => {
    const statusTexts: Record<string, string> = {
      reserved: "Reserved",
      inBox: "In Box",
      done: "Done",
    };

    const matchedStatus = Object.keys(statusTexts).find(
      (key) => key === status
    );

    return matchedStatus ? statusTexts[matchedStatus] : undefined;
  };

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  const userId = useSelector((state: RootState) => state.user.id);

  const handleOpenBox = async (exchage: ExchangeSimpleInterface) => {
    try {
      if (
        (exchage.exchangeState === exchnageStatus.reserved &&
          exchage.creatorId === parseInt(userId)) ||
        (exchage.exchangeState === exchnageStatus.inBox &&
          exchage.pickUpPersonId === parseInt(userId))
      ) {
        const { data } = await axios.post(
          generateUrl("exchange/get-code-for-exchnage-box"),
          { id: exchage.id, userId: parseInt(userId) },
          { withCredentials: true }
        );

        dispatch(setOpenBoxCode(data));

        setOpen({
          exchnageId: exchage.id,
          showOpenBoxForm: true,
          userId: exchage.pickUpPersonId,
        });
      }
    } catch (error) {
      handleShowError("You tried to open box recently try later");
      console.error("An error occurred:", error);
    }
  };

  const handleExhcnageDelete = async (id: number) => {
    try {
      await axios.post(
        generateUrl("exchange/delete-exchange"),
        { id: id },
        { withCredentials: true }
      );

      dispatch(showInfo("You have deleted items belonging to this exchange"));

      if (exchages) {
        const updatedExchanges = exchages.filter(
          (exchange) => exchange.id !== id
        );
        setExchanges(updatedExchanges);
      }
    } catch (error) {
      console.error("Error deleting exchange:", error);
    }
  };

  return (
    <div className="w-full flex flex-wrap">
      {exchages?.map((exchage, index) => (
        <div key={index} className="h-56 w-80 m-5">
          <div
            className={`divide-y divide-black-200 bgb rounded-lg ${
              exchage.creatorId === parseInt(userId)
                ? "bg-blue-100"
                : "bg-green-100"
            }  shadow`}
          >
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
                  className="h-10 w-10 flex-shrink-0 rounded-full "
                  src={exchage.friendImgUrl}
                  alt=""
                />
              ) : (
                <div className="h-10 w-10 flex-shrink-0 rounded-full ">
                  <UserCircleIcon />
                </div>
              )}
            </div>
            <div>
              <div className="cursor-pointer -mt-px flex divide-x divide-gray-200">
                <div
                  onClick={() => {
                    setExchangeDetail({
                      activeExchangeId: exchage.id,
                      seeDetail: true,
                    });
                  }}
                  className="flex w-0 flex-1"
                >
                  <p className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <DocumentMagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    See detail
                  </p>
                </div>
                <div
                  onClick={() => {
                    if (exchage.exchangeState === exchnageStatus.done) {
                      handleExhcnageDelete(exchage.id);
                    } else {
                      return;
                      handleOpenBox(exchage);
                    }
                  }}
                  className="-ml-px cursor-pointer flex w-0 flex-1"
                >
                  <p className=" text-centerrelative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    {exchage.exchangeState === exchnageStatus.done ? (
                      <CheckBadgeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : exchage.exchangeState === exchnageStatus.reserved &&
                      exchage.creatorId === parseInt(userId) ? (
                      <LockOpenIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : exchage.exchangeState === exchnageStatus.inBox &&
                      exchage.pickUpPersonId === parseInt(userId) ? (
                      <LockOpenIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : null}
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
