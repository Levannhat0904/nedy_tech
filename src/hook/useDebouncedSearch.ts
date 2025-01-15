"use client";

import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UseDebouncedSearchOptions {
  delay?: number;
  defaultPageSize?: number;
}

const useDebouncedSearch = (
  options?: UseDebouncedSearchOptions
) => {
  const { delay = 1000, defaultPageSize = 10 } = options || {};
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentParams, setCurrentParams] = useState<Record<string, string>>(
    Object.fromEntries(searchParams.entries())
  );

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const updatedParams = {
        ...currentParams,
        page: "1",
        pageSize: currentParams.pageSize || defaultPageSize.toString(),
        s: value,
      };
      setCurrentParams(updatedParams);
      const queryString = new URLSearchParams(updatedParams).toString();
      router.push(`?${queryString}`);
    }, delay),
    [currentParams, defaultPageSize, delay, router]
  );

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return handleInputSearchChange;
};

export default useDebouncedSearch;
