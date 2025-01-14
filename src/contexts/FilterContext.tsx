"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho query params
type QueryParams<T = {}> = T & { page: number; pageSize: number; s: string };

// Định nghĩa kiểu dữ liệu cho context
interface FilterContextType<T> {
  queryParams: QueryParams<T>;
  setQueryParams: (value: QueryParams<T>) => void;
}

// Tạo context
const FilterContext = createContext<FilterContextType<any> | undefined>(
  undefined
);

// Định nghĩa props cho FilterProvider
interface FilterProviderProps<T> {
  initialParams?: QueryParams<T>; // Giá trị khởi tạo là không bắt buộc
  children: ReactNode;
}

// Tạo provider với giá trị mặc định
export const FilterProvider = <T extends Record<string, unknown>>({
  initialParams,
  children,
}: FilterProviderProps<T>) => {
  // Giá trị mặc định nếu không truyền `initialParams`
  const defaultParams: QueryParams<T> = {
    ...(initialParams || {}),
    page: initialParams?.page || 1,
    pageSize: initialParams?.pageSize || 10,
    s: initialParams?.s || "",
  };

  const [queryParams, setQueryParams] = useState<QueryParams<T>>(defaultParams);
  console.log("context: ", queryParams);
  return (
    <FilterContext.Provider value={{ queryParams, setQueryParams }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useFilterContext = <
  T extends Record<string, unknown>,
>(): FilterContextType<T> => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
