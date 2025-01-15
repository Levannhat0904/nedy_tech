"use client";

import { useRouter } from "next/navigation";
import { useEvenEdit } from "../contexts/EventContext";

const useCustomNavigate = () => {
  const router = useRouter();
  const { isEdit, setPath, setIsOpenNotify } = useEvenEdit();

  const customNavigate = (path: string) => {
    setPath(path);
    if (!isEdit) {
      setIsOpenNotify(false);
    } else {
      setIsOpenNotify(true);
      return;
    }
    router.push(path);
  };
  return customNavigate;
};

export default useCustomNavigate;
