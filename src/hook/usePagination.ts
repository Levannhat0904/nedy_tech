// import { useSearchParams } from 'react-router-dom'
// export const usePaginationV2 = (defaultPage: number = 1, defaultPageSize: number = 10) => {
//   const [, setSearchParams] = useSearchParams()

//   const handleOnPageChange = (page: number = defaultPage, pageSize: number = defaultPageSize) => {
//     const updatedParams = new URLSearchParams(window.location.search)
//     // Cập nhật lại tham số page và pageSize, giữ nguyên các tham số khác
//     updatedParams.set('page', page.toString())
//     updatedParams.set('pageSize', pageSize.toString())
//     // Cập nhật các tham số mới vào URL
//     setSearchParams(updatedParams)

//     // Cuộn lên đầu trang
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return {
//     handleOnPageChange
//   }
// }

// // export default usePagination


// "use client";

import { useSearchParams, useRouter } from "next/navigation";

export const usePaginationV2 = (defaultPage = 1, defaultPageSize = 10) => {
  const searchParams = useSearchParams(); // Lấy tham số hiện tại
  const router = useRouter(); // Để thay đổi URL
  const handleOnPageChange = (page = defaultPage, pageSize = defaultPageSize) => {
    const updatedParams = new URLSearchParams(searchParams); // Sao chép tham số hiện tại
    // Cập nhật lại tham số page và pageSize, giữ nguyên các tham số khác
    updatedParams.set("page", page.toString());
    updatedParams.set("pageSize", pageSize.toString());
    // Cập nhật URL với các tham số mới
    router.replace(`?${updatedParams.toString()}`);
    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    handleOnPageChange,
  };
};
