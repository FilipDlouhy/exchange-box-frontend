import { useEffect } from "react";
import axios from "axios";
import generateUrl from "../../../contants/url";

type SetData<T> = (data: T) => void;

export const useFetchDataSimple = <T extends unknown[]>(
  url: string,
  setData: SetData<T>,
  reTrigger?: any
): void => {
  const fetchData = async () => {
    try {
      const response = await axios.get(generateUrl(url), {
        withCredentials: true,
      });

      console.log(response);

      setData(response.data as T);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reTrigger]);
};
