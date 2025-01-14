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
  const router = useRouter(); // Thay đổi URL
  const searchParams = useSearchParams(); // Lấy query hiện tại

  const [currentParams, setCurrentParams] = useState<Record<string, string>>(
    Object.fromEntries(searchParams.entries()) // Lấy query params ban đầu
  );

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const updatedParams = {
        ...currentParams, // Giữ nguyên các tham số hiện tại
        page: "1", // Reset page khi tìm kiếm mới
        pageSize: currentParams.pageSize || defaultPageSize.toString(),
        s: value, // Cập nhật giá trị tìm kiếm
      };
      setCurrentParams(updatedParams); // Cập nhật state
      const queryString = new URLSearchParams(updatedParams).toString();
      router.push(`?${queryString}`); // Cập nhật URL
    }, delay),
    [currentParams, defaultPageSize, delay, router]
  );

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value); // Thực hiện debounce khi nhập
  };

  return handleInputSearchChange;
};

export default useDebouncedSearch;
