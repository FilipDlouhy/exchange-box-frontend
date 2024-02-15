import axios from "axios";
import generateUrl from "../../../contants/url";
import { ChangePasswordDto } from "../../../Dtos/UserDtos/change.password.dto";

type ChangePasswordArgs = {
  email: string;
  prevPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function handleChangePasswordHelper({
  email,
  prevPassword,
  newPassword,
  confirmPassword,
}: ChangePasswordArgs): Promise<void> {
  if (newPassword !== confirmPassword) {
    console.error("New password and confirm password do not match.");
    return;
  }

  const changePasswordDto = new ChangePasswordDto(
    newPassword,
    email,
    prevPassword
  );

  try {
    await axios.post(generateUrl("/user/change-password"), changePasswordDto);
  } catch (error) {
    console.error(error);
  }
}
