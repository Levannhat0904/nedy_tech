"use client";
import React, { useCallback } from "react";
import { useAuthors } from "../../../contexts/AuthorsContext";
import { usePostsV2 } from "../../../hook/CustomHook";
import { usePaginationV2 } from "../../../hook/usePagination";
import useQueryParamUrl from "../../../hook/useQueryParamUrl";
import { IAsset, IAuthor } from "../../../interfaces";
import MainPage from "@/components/templates/TPostList";
import { debounce } from "lodash";
import { useFilter } from "@/contexts/FilterContext";
export type FilterOption = {
  type: "select" | "input";
  name: string;
  label: string;
  items?: IAsset[] | IAuthor[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any;
  selectedItems?: string[];
};
const pushToUrl = false;
const PPost: React.FC = () => {
  const { filter } = useFilter();
  console.log("filter: ", filter);
  const { authors, assets } = useAuthors();
  const [, updateQueryParams] = useQueryParamUrl({
    assets: [],
    authors: [],
    s: [],
  });
  const { handleOnPageChange } = usePaginationV2(pushToUrl);
  const handleSelectChange = (
    key: "authors" | "assets" | "s",
    selectedValues: string[]
  ) => {
    updateQueryParams(key, selectedValues, pushToUrl);
  };
  const debouncedUpdateQueryParams = useCallback(
    debounce(updateQueryParams, 1000),
    [updateQueryParams]
  );
  const filterData: FilterOption[] = [
    {
      type: "input",
      name: "search",
      label: "Search",
      onChange: (s: React.ChangeEvent<HTMLInputElement>) =>
        debouncedUpdateQueryParams("s", [s.target.value], false),
    },
    {
      type: "select",
      name: "authors",
      label: "Authors",
      items: authors,
      selectedItems: filter.authors,
      onChange: (selectedAuthors: string[]) =>
        handleSelectChange("authors", selectedAuthors),
    },
    {
      type: "select",
      name: "assets",
      label: "Assets",
      items: assets,
      selectedItems: filter.assets,
      onChange: (selectedAssets: string[]) =>
        handleSelectChange("assets", selectedAssets),
    },
  ];
  const { data, isLoading, error, isError } = usePostsV2({
    page: filter.page,
    pageSize: filter.pageSize,
    s: filter.s ? filter.s : undefined,
    authors: filter.authors,
    assets: filter.assets,
  });
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <MainPage
      datas={data}
      loading={isLoading}
      handleOnPageChange={handleOnPageChange}
      filterData={filterData}
    />
  );
};

export default PPost;
