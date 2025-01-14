"use client";
import React from "react";
import { useAuthors } from "../../../contexts/AuthorsContext";
import { usePostsV2 } from "../../../hook/CustomHook";
import { usePaginationV2 } from "../../../hook/usePagination";
import useDebouncedSearch from "../../../hook/useDebouncedSearch";
import useQueryParamUrl from "../../../hook/useQueryParamUrl";
import { IAsset, IAuthor } from "../../../interfaces";
import MainPage from "@/components/templates/TPostList";
export type FilterOption = {
  type: "select" | "input"; // Thêm 'input' vào 'type'
  name: string;
  label: string;
  items?: IAsset[] | IAuthor[]; // 'options' chỉ cần thiết cho 'select'
  onChange?: any;
  selectedItems?: any;
};

const PPost: React.FC = () => {
  const { authors, assets } = useAuthors();

  // Sử dụng hook để quản lý các tham số URL
  const [queryParams, updateQueryParams] = useQueryParamUrl({
    assets: [],
    authors: [],
    s: [],
  });
  console.log("queryParams: ", queryParams);
  const { handleOnPageChange } = usePaginationV2();

  // Hàm xử lý khi thay đổi tác giả hoặc tài sản được chọn
  const handleSelectChange = (
    key: "authors" | "assets" | "s",
    selectedValues: string[]
  ) => {
    updateQueryParams(key, selectedValues, false); // Cập nhật giá trị trong URL
  };

  // const handleInputSearchChange = useDebouncedSearch({
  //   delay: 1000,
  //   defaultPageSize: 10,
  // });
  const filterData: FilterOption[] = [
    {
      type: "input",
      name: "search",
      label: "Search",
      onChange: (s: string) => handleSelectChange("s", [s]),
      // onChange: handleInputSearchChange,
    },
    {
      type: "select",
      name: "authors",
      label: "Authors",
      items: authors, // Mảng lựa chọn
      selectedItems: queryParams.authors,
      onChange: (selectedAuthors: string[]) =>
        handleSelectChange("authors", selectedAuthors),
    },
    {
      type: "select",
      name: "assets",
      label: "Assets",
      items: assets, // Mảng lựa chọn
      selectedItems: queryParams.assets,
      onChange: (selectedAssets: string[]) =>
        handleSelectChange("assets", selectedAssets),
    },
  ];
  // API call với searchParams
  const { data, isLoading, error, isError } = usePostsV2({
    page: queryParams.page,
    pageSize: queryParams.pageSize,
    s: queryParams.s ? queryParams.s : undefined,
    authors: queryParams.authors, // Lấy selected authors từ queryParams
    assets: queryParams.assets, // Lấy selected assets từ queryParams
  });
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <MainPage
      datas={data}
      loading={isLoading}
      handleOnPageChange={handleOnPageChange}
      // test
      filterData={filterData}
    />
  );
};

export default PPost;
