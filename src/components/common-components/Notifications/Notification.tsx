import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { NotificationProps } from "./Props/NotificationProps";

function Notification({
  notification,
  notifications,
  setNotifications,
  numberOfNotifications,
  setNumberOfNotifications,
}: NotificationProps) {
  const [wasSeen, setWasSeen] = useState<boolean>(notification.seen);

  const changeNotificationToSeenOrDelete = async (isDeleteing: boolean) => {
    try {
      if (wasSeen && !isDeleteing) {
        return;
      }

      await axios.post(
        generateUrl(
          isDeleteing
            ? "notification/delete-notification"
            : "notification/change-notification-seen-state"
        ),
        {
          id: notification.id,
        }
      );

      if (isDeleteing) {
        const newNotifications = notifications?.filter(
          (pervNotifiaction) => pervNotifiaction.id !== notification.id
        );

        setNotifications(newNotifications);
      } else {
        setWasSeen(true);
      }

      setNumberOfNotifications(
        numberOfNotifications === 0 ? 0 : numberOfNotifications - 1
      );
    } catch (error) {
      console.error(
        "An error occurred while changing notification state:",
        error
      );
    }
  };

  return (
    <div className="col-span-1 flex rounded-md shadow-sm my-2">
      <div
        onClick={() => {
          changeNotificationToSeenOrDelete(false);
        }}
        className={`  ${
          wasSeen ? "bg-indigo-800" : "bg-emerald-700"
        } flex w-16 flex-shrink-0 items-center cursor-pointer justify-center rounded-l-md text-sm font-medium text-white `}
      >
        {notification.initials}
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <p className="font-medium text-gray-900 hover:text-gray-600">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-500">{notification.text}</p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button
            onClick={() => {
              changeNotificationToSeenOrDelete(true);
            }}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
