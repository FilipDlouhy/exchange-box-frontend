import React from "react";

export interface UserCredentialsProps {
  phone: string | null | undefined;
  adress: string | null | undefined;
  wasUpdated: boolean;
  setWasUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAdressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateUserData: () => Promise<void>;
}
