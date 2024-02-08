import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../../../store/errorSlice";
import { PaginationState } from "../../../../contants/PaginationInteface";
import generateUrl from "../../../../contants/url";

type SetData<T> = (data: T | ((prevData: T) => T)) => void;

export const useFetchData = <T>(url: string, setData: SetData<T>): void => {
  const pagination: PaginationState = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(generateUrl(url), {
          params: {
            page: 1,
            limit: 10,
          },
        });

        setData((prevData) => {
          return { ...prevData, ...response.data };
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    };

    fetchData();
  }, [url, setData, pagination]);
};
