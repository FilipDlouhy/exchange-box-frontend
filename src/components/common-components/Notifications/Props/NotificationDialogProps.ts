import React from "react";

export interface NotificationDialogProps {
  openNotifications: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfNotifications: number | null | undefined;
  setNumberOfNotifications: React.Dispatch<React.SetStateAction<number>>;
}
