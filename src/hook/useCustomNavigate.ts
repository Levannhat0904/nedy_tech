// import { useNavigate } from 'react-router-dom'
// import { useEvenEdit } from '../contexts/EventContext'
// const useCustomNavigate = () => {
//   const navigate = useNavigate()
//   const { isEdit, setPath, setIsOpenNotify } = useEvenEdit()

//   const customNavigate = (path: string) => {
//     setPath(path)
//     if (!isEdit) {
//       setIsOpenNotify(false) // Cập nhật trạng thái trong context
//     }
//     if (isEdit == true) {
//       setIsOpenNotify(true) // Cập nhật trạng thái trong context
//       return
//     }
//     navigate(path)
//   }
//   return customNavigate
// }

// export default useCustomNavigate

"use client";

import { useRouter } from "next/navigation";
import { useEvenEdit } from "../contexts/EventContext";

const useCustomNavigate = () => {
  const router = useRouter(); // Sử dụng useRouter từ next/navigation
  const { isEdit, setPath, setIsOpenNotify } = useEvenEdit();

  const customNavigate = (path: string) => {
    setPath(path); // Lưu đường dẫn vào context
    if (!isEdit) {
      setIsOpenNotify(false); // Đóng thông báo nếu không ở chế độ chỉnh sửa
    } else {
      setIsOpenNotify(true); // Hiển thị thông báo nếu đang chỉnh sửa
      return; // Không thực hiện điều hướng
    }
    router.push(path); // Điều hướng đến đường dẫn mới
  };
  return customNavigate;
};

export default useCustomNavigate;
