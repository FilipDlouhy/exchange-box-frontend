import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
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
      timerId = null;
    }
  };

  return debouncedFunction;
};

export const useFetchDataSearch = <T extends unknown[]>(
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

  const paginationRef = useRef(pagination);
  const searchTextRef = useRef(searchText);

  useEffect(() => {
    if (paginationRef.current !== pagination) {
      paginationRef.current = pagination;
    }
    if (searchTextRef.current !== searchText) {
      searchTextRef.current = searchText;
    }
  }, [pagination, searchText]);

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  const fetchData = useCallback(
    debounce(async (search: string) => {
      try {
        const response: AxiosResponse<T, any> = await axios.get<T>(
          generateUrl(url),
          {
            params: {
              search,
              page: paginationRef.current.starting,
              limit: paginationRef.current.max,
            },
            withCredentials: true,
          }
        );

        const mergedData: any = additionalData
          ? [...additionalData, ...response.data]
          : response.data;

        setData(mergedData);
        setLastFetchLength(search.length);
        response.data.length > 0
          ? dispatch(showButton())
          : dispatch(hideButton());
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    }, 500),
    [
      setData,
      dispatch,
      paginationRef.current.starting,
      paginationRef.current.max,
    ] // Ensure all dependencies are included
  );

  useEffect(() => {
    if (
      searchTextRef.current.length > 4 &&
      searchTextRef.current.length > lastFetchLength &&
      additionalData
    ) {
      const filteredItems = additionalData.filter(
        (item) =>
          item &&
          typeof item[filterAttribute] === "string" &&
          item[filterAttribute]
            .toLowerCase()
            .includes(searchTextRef.current.toLowerCase())
      );
      setLastFetchLength(searchTextRef.current.length);
      setData(filteredItems);
    } else {
      fetchData(searchTextRef.current);
    }

    return () => {
      fetchData.cancel();
    };
  }, [
    searchTextRef.current,
    paginationRef.current.starting,
    paginationRef.current.max,
  ]);

  useEffect(() => {
    fetchData(searchTextRef.current);
    return () => {
      fetchData.cancel();
    };
  }, [rerender, fetchData]);
};
