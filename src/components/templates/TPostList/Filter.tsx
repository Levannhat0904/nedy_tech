import React, { useCallback } from "react";
import { Input } from "antd";
// import { useSearchParams } from 'react-router-dom'
import FilterSelect from "../../atoms/ASelectAuthor";
import { FilterOption } from "@/components/pages/posts";
import { useSearchParams } from "next/navigation";
import useQueryParams from "@/hook/useQueryParamUrl";
import { debounce } from "lodash";
import { useEvenEdit } from "@/contexts/EventContext";
const { Search } = Input;
const Filter = ({ filterData }: { filterData: FilterOption[] }) => {
  const params = useSearchParams();
  // const [searchParams] = useSearchParams();
  const s = params.get("s") || "";
  const [queryParams, updateQueryParams] = useQueryParams({
    assets: [],
    authors: [],
    s: [],
  });
  const { setIsEdit } = useEvenEdit(); // Lấy dữ liệu từ context

  const handleSelectChange = (
    key: "authors" | "assets" | "s",
    selectedValues: string[]
  ) => {
    updateQueryParams(key, selectedValues, false); // Cập nhật giá trị trong URL
  };
  const debouncedUpdateQueryParams = useCallback(
    debounce(updateQueryParams, 1000),
    [updateQueryParams]
  );
  return (
    <>
      {filterData.map((filter) => (
        <div key={filter.name}>
          {(() => {
            switch (filter.type) {
              case "input":
                // Render FilterInput cho input
                return (
                  <Search
                    size="large"
                    className="h-full w-60"
                    // value={meta.s}
                    defaultValue={s}
                    // onChange={handleInputSearchChange}
                    // onChange={filter.onChange}
                    // onChange={() => {
                    //   setIsEdit(true);
                    // }}
                    onChange={(s) =>
                      debouncedUpdateQueryParams("s", [s.target.value], false)
                    }
                    placeholder="input search text"
                    // onSearch={handleSearch}
                    enterButton
                  />
                );
              case "select":
                // Render FilterSelect cho select
                return (
                  <FilterSelect
                    items={filter.items || []}
                    selectedItems={filter.selectedItems} // Hoặc selectedAssets tùy vào filter
                    onChange={filter.onChange}
                  />
                );

              default:
                return null;
            }
          })()}
        </div>
      ))}
    </>
  );
};

export default Filter;
