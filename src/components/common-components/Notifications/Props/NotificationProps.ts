import React from "react";
import { INotification } from "../Interfaces/NotificationInterface";

export interface NotificationProps {
  notification: INotification;
  notifications: INotification[] | undefined;
  setNotifications: React.Dispatch<
    React.SetStateAction<INotification[] | undefined>
  >;
  numberOfNotifications: number;
  setNumberOfNotifications: React.Dispatch<React.SetStateAction<number>>;
}
