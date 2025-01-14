"use client";
import React, { createContext, useContext, useState } from "react";

type QueryParams<T> = T & { page: number; pageSize: number; s: string };

interface QueryParamsContextType<T> {
  filter: QueryParams<T>;
  setFilter: React.Dispatch<React.SetStateAction<QueryParams<T>>>;
}

// Tạo context cho QueryParams
const QueryParamsContext = createContext<
  QueryParamsContextType<any> | undefined
>(undefined);

// Tạo Provider cho context
export const QueryParamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<QueryParams<any>>({
    page: 1,
    pageSize: 10,
    s: "",
  });
  return (
    <QueryParamsContext.Provider value={{ filter, setFilter }}>
      {children}
    </QueryParamsContext.Provider>
  );
};
// Hook để sử dụng QueryParams context
export const useFilter = () => {
  const context = useContext(QueryParamsContext);
  if (!context) {
    throw new Error("useQueryParams must be used within a QueryParamsProvider");
  }
  return context;
};
