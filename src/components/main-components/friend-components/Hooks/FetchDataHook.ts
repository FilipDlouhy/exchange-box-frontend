import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../../../store/errorSlice";
import generateUrl from "../../../../contants/url";
import { PaginationState } from "../../../../contants/PaginationInteface";

type SetData<T> = (data: T) => void;

export const useFetchData = <T>(
  url: string,
  setData: SetData<T>,
  additionalData: T | undefined
): void => {
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

        const mergedData = { ...additionalData, ...response.data };
        setData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    };

    fetchData();
  }, [url, setData, pagination, additionalData, dispatch]);
};
