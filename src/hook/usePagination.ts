import { useFilter } from "@/contexts/FilterContext";
import { useSearchParams, useRouter } from "next/navigation";

export const usePaginationV2 = (pushToUrl: boolean = true, defaultPage = 1, defaultPageSize = 10) => {
  const { filter, setFilter } = useFilter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleOnPageChange = (page = defaultPage, pageSize = defaultPageSize) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set("page", page.toString());
    updatedParams.set("pageSize", pageSize.toString());
    setFilter((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
    if (pushToUrl) {

      router.replace(`?${updatedParams.toString()}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return {
    handleOnPageChange,
  };
};
