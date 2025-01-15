"use client";
import React, { createContext, useContext, useState } from "react";

type QueryParams<T> = T & { page: number; pageSize: number; s: string };

interface QueryParamsContextType<T> {
  filter: QueryParams<T>;
  setFilter: React.Dispatch<React.SetStateAction<QueryParams<T>>>;
}

const QueryParamsContext = createContext<
  QueryParamsContextType<any> | undefined
>(undefined);

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
export const useFilter = () => {
  const context = useContext(QueryParamsContext);
  if (!context) {
    throw new Error("useQueryParams must be used within a QueryParamsProvider");
  }
  return context;
};
