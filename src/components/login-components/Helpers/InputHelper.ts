import { ChangeEvent } from "react";

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  const { value } = e.target;
  setState(value);
};
