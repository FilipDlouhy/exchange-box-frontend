import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { OpenBoxDto } from "./dtos/OpenBoxDto";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { hideInfo, showInfo } from "../../../store/infoSlice";
import { showError } from "../../../store/errorSlice";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import { exchnageStatus } from "./helpers/ExchnageStatus";

export default function OpenExchangeBoxDialog({
  open,
  setOpen,
  setExchanges,
  exchages,
}: {
  setOpen: React.Dispatch<
    React.SetStateAction<{
      showOpenBoxForm: boolean;
      exchangeId: number;
      userId: number;
    }>
  >;
  open: {
    showOpenBoxForm: boolean;
    exchnageId: number;
    userId: number;
  };
  exchages: ExchangeSimpleInterface[] | undefined;
  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;
}) {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const openBoxCode = useSelector((state) => state.openBox.openBoxCode);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const closeAndResetModal = () => {
    setOpen({ ...open, showOpenBoxForm: false });
    setTimer(30);
  };

  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (open.showOpenBoxForm && openBoxCode) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            closeAndResetModal();
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [open.showOpenBoxForm, openBoxCode]);

  const openBox = async () => {
    try {
      const openBoxDto = new OpenBoxDto(open.exchnageId, code);

      console.log(
        generateUrl(
          parseInt(userId) === open.userId
            ? "exchange/open-box-via-exchnage-pick-up-person"
            : "exchange/open-box-via-exchnage-creator"
        )
      );

      await axios.post(
        generateUrl(
          parseInt(userId) === open.userId
            ? "exchange/open-box-via-exchnage-pick-up-person"
            : "exchange/open-box-via-exchnage-creator"
        ),
        openBoxDto,
        {
          withCredentials: true,
        }
      );

      dispatch(
        showInfo(
          parseInt(userId) !== open.userId
            ? "You have two minutes to put items into the box before it closes."
            : "You have two minutes to take out your  items before box closes."
        )
      );

      setTimeout(() => {
        dispatch(hideInfo());

        const updatedExchanges = exchages?.map((exchange) => {
          if (exchange.id === open.exchnageId) {
            return {
              ...exchange,
              exchangeState:
                parseInt(userId) !== open.userId
                  ? exchnageStatus.inBox
                  : exchnageStatus.done,
            };
          }
          return exchange;
        });

        setExchanges(updatedExchanges);
      }, 2 * 60 * 1000);
    } catch (error) {
      console.error("Failed to open the box:", error);

      dispatch(showError("Failed to open the box"));
    }
  };

  if (openBoxCode && open.showOpenBoxForm) {
    return (
      <Transition.Root show={open.showOpenBoxForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAndResetModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <h1 className="text-center text-2xl font-semibold">
                      Open your box
                    </h1>

                    <h1 className="text-center text-lg font-extrabold">
                      Your code to open box is: {openBoxCode}
                    </h1>
                    <div className="mt-3 text-center sm:mt-5">
                      <p className="text-lg">Time left: {timer} seconds</p>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your code here"
                        className="mt-4 w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:flex justify-between sm:space-x-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      onClick={openBox}
                    >
                      Send Code
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={closeAndResetModal}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  } else {
    return null;
  }
}
