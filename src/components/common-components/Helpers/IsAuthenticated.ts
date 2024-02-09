import axios from "axios";
import generateUrl from "../../../contants/url";

export const isAuthenticated = async (): Promise<boolean> => {
  const url = generateUrl("auth/check-token");
  try {
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error checking token:", error);

    return false;
  }
};
