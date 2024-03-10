import React from "react";
import { INotification } from "../interfaces/NotificationInterface";

export interface NotificationProps {
  notification: INotification;
  notifications: INotification[] | undefined;
  setNotifications: React.Dispatch<
    React.SetStateAction<INotification[] | undefined>
  >;
  numberOfNotifications: number;
  setNumberOfNotifications: React.Dispatch<React.SetStateAction<number>>;
}
