import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../../store/errorSlice";
import generateUrl from "../../../contants/url";
import { PaginationState } from "../../../contants/PaginationInteface";
import { hideButton, showButton } from "../../../store/paginationSlice";

type SetData<T> = (data: T) => void;

const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  const debouncedFunction = (...args: Parameters<F>): void => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
  };

  return debouncedFunction;
};

export const useFetchDataSearch = <T extends { [key: string]: any }>(
  url: string,
  setData: SetData<T | undefined>,
  additionalData: T | undefined,
  filterAttribute: string,
  rerender?: any
): void => {
  const [lastFetchLength, setLastFetchLength] = useState(0);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.searchText);
  const pagination: PaginationState = useSelector((state) => state.pagination);

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  const fetchData = useCallback(
    debounce(async (search: string) => {
      try {
        setLastFetchLength(search.length);
        const response = await axios.get<T>(generateUrl(url), {
          params: { search, page: pagination.starting, limit: pagination.max },
          withCredentials: true,
        });

        setData(response.data);
        setLastFetchLength(search.length);

        response.data.length > 0
          ? dispatch(showButton())
          : dispatch(hideButton());
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    }, 500),
    [setData]
  );

  useEffect(() => {
    setData(undefined);

    if (
      searchText.length > 4 &&
      searchText.length > lastFetchLength &&
      additionalData
    ) {
      const filteredItems = additionalData.filter(
        (item) =>
          item &&
          typeof item[filterAttribute] === "string" &&
          item[filterAttribute].toLowerCase().includes(searchText.toLowerCase())
      );
      setLastFetchLength(searchText.length);
      setData(filteredItems as T);
    } else {
      fetchData(searchText);
    }

    return () => {
      fetchData.cancel();
    };
  }, [searchText, rerender]);
};
