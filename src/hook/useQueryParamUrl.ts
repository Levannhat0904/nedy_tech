import { useEffect, useCallback } from 'react'
import { useSearchParams } from "next/navigation";
import { useFilter } from '@/contexts/FilterContext';
type QueryParams<T> = T & { page: number; pageSize: number; s: string }
function useQueryParams<T extends Record<string, string[] | string>>(
  initialState: T,
  defaultPage: number = 1,
  defaultPageSize: number = 10,

): [QueryParams<T>, (key: keyof T, newState: string[], pushToUrl?: boolean) => void] {
  const searchParams = useSearchParams()
  const getInitialQueryParams = (): QueryParams<T> => {
    if (typeof window === 'undefined') {
      return {
        ...initialState,
        page: defaultPage,
        pageSize: defaultPageSize,
        // s: '',
      } as QueryParams<T>;
    }
    const urlParams = new URLSearchParams(window.location.search);

    const parsedParams: Partial<QueryParams<T>> = {
      ...initialState,
      page: defaultPage,
      pageSize: defaultPageSize,
      s: '',
    }
    for (const key of Object.keys(initialState)) {
      const values = urlParams.getAll(key);
      if (values.length > 0) {
        parsedParams[key as keyof T] = values as QueryParams<T>[keyof T];
      }
    }
    parsedParams.page = parseInt(urlParams.get('page') || `${defaultPage}`, 10) as T["page"] & number;
    parsedParams.pageSize = parseInt(urlParams.get('pageSize') || `${defaultPageSize}`, 10) as T["pageSize"] & number;

    return parsedParams as QueryParams<T>;
  }
  const { filter, setFilter } = useFilter<QueryParams<T>>(getInitialQueryParams);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updatedQueryParams = getInitialQueryParams();
      // setQueryParams((prevParams) =>
      //   JSON.stringify(updatedQueryParams) !== JSON.stringify(prevParams) ? updatedQueryParams : prevParams
      // );
      setFilter((prevParams) =>
        JSON.stringify(updatedQueryParams) !== JSON.stringify(prevParams) ? updatedQueryParams : prevParams
      );
    }
  }, [searchParams]);
  const updateQueryParams = useCallback(
    (key: keyof T, newState: string[], pushToUrl: boolean = true) => {
      // setQueryParams((prev) => {
      //   const updatedParams = { ...prev, [key]: newState };
      //   return updatedParams;
      // });
      setFilter((prev) => {
        const updatedParams = { ...prev, [key]: newState, page: '1' };
        return updatedParams;
      });
      if (pushToUrl && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete(key as string);
        newState.forEach((value) => urlParams.append(key as string, value));
        // Đảm bảo các giá trị `page`, `pageSize`, `s` được đồng bộ
        urlParams.set('page', `${defaultPage}`);
        urlParams.set('pageSize', `${defaultPageSize}`);
        // urlParams.set('s', searchParams.get('s') || '');
        // Cập nhật URL
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
      }
    },
    [defaultPage, defaultPageSize, searchParams]
  );
  return [filter, updateQueryParams];
}

export default useQueryParams;
