import React, { useCallback } from "react";
import { Input } from "antd";
import FilterSelect from "../../atoms/ASelectAuthor";
import { FilterOption } from "@/components/pages/posts";
import { useSearchParams } from "next/navigation";
import useQueryParams from "@/hook/useQueryParamUrl";
import { debounce } from "lodash";
const { Search } = Input;
const Filter = ({ filterData }: { filterData: FilterOption[] }) => {
  const params = useSearchParams();
  // const [searchParams] = useSearchParams();
  const s = params.get("s") || "";
  const [, updateQueryParams] = useQueryParams({
    assets: [],
    authors: [],
    s: [],
  });

  const handleSelectChange = (
    key: "authors" | "assets" | "s",
    selectedValues: string[]
  ) => {
    updateQueryParams(key, selectedValues, false);
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
                return (
                  <Search
                    size="large"
                    className="h-full w-60"
                    defaultValue={s}
                    onChange={(s) =>
                      debouncedUpdateQueryParams("s", [s.target.value], false)
                    }
                    placeholder="input search text"
                    enterButton
                  />
                );
              case "select":
                return (
                  <FilterSelect
                    items={filter.items || []}
                    selectedItems={filter.selectedItems as string[]}
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
