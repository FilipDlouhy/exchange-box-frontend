import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../../store/errorSlice";
import { hideButton } from "../../../store/paginationSlice";
import { PaginationState } from "../../../contants/PaginationInteface";
import generateUrl from "../../../contants/url";

type SetData<T> = (data: T) => void;

export const useFetchData = <T extends unknown[]>(
  url: string,
  setData: SetData<T | undefined>,
  additionalData: T | undefined,
  reTrigger?: any
): void => {
  const pagination: PaginationState = useSelector((state) => state.pagination);
  const searchText = useSelector((state) => state.search.searchText);
  const dispatch = useDispatch();

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
  const fetchData = async () => {
    try {
      const response = await axios.get(generateUrl(url), {
        params: {
          page: paginationRef.current.starting,
          limit: paginationRef.current.max,
          ...(searchTextRef.current.length > 0 && {
            search: searchTextRef.current,
          }),
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
  useEffect(() => {
    fetchData();
  }, [pagination.starting, pagination.max]);

  useEffect(() => {
    setData(undefined);
    fetchData();
  }, [reTrigger]);

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };
};
