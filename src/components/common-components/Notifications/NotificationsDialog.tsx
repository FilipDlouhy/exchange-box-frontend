import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import Notification from "./Notification";
import { useFetchData } from "../Hooks/FetchDataHook";
import { INotification } from "./Interfaces/NotificationInterface";
import LoadMoreButton from "../LoadMoreButton";

export default function NotificationsDialog({
  openNotifications,
  setOpenNotifications,
}: {
  openNotifications: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [notifications, setNotifications] = useState<INotification[]>();

  useFetchData<INotification[]>(
    `notification/get-notifications`,
    setNotifications,
    notifications
  );
  return (
    <Transition.Root show={openNotifications} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenNotifications}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BellAlertIcon
                      className="h-8 w-8 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Your notifications
                    </Dialog.Title>
                  </div>
                </div>

                <div className="w-full h-56">
                  <div className="max-h-56 overflow-y-auto">
                    {notifications &&
                      notifications.map((notification) => {
                        return (
                          <Notification
                            notification={notification}
                            notifications={notifications}
                            key={notification.id}
                            setNotifications={setNotifications}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    className="w-36 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpenNotifications(false)}
                  >
                    Go back
                  </button>

                  <LoadMoreButton styles={"w-36 h-8"} notInDiv={true} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
