import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../../../store/errorSlice";
import generateUrl from "../../../../contants/url";
import { PaginationState } from "../../../../contants/PaginationInteface";
import { hideButton } from "../../../../store/paginationSlice";

type SetData<T> = (data: T) => void;

export const useFetchData = <T extends unknown[]>(
  url: string,
  setData: SetData<T>,
  additionalData: T | undefined
): void => {
  const pagination: PaginationState = useSelector((state) => state.pagination);
  const searchText = useSelector((state) => state.search.searchText);
  const dispatch = useDispatch();
  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          searchText.length > 0
            ? await axios.get(generateUrl(url), {
                params: {
                  page: pagination.starting,
                  limit: pagination.max,
                },
                withCredentials: true,
              })
            : await axios.get(generateUrl(url), {
                params: {
                  page: pagination.starting,
                  limit: pagination.max,
                  search: searchText,
                },
                withCredentials: true,
              });

        if (response.data.length === 0) {
          dispatch(hideButton());
        }

        const mergedData = additionalData
          ? [...additionalData, ...response.data]
          : [...response.data];

        setData(mergedData as T);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    };

    fetchData();
  }, [pagination]);
};
