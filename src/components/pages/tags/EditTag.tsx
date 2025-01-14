// export default EditTag
"use client";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Form, Skeleton } from "antd";
// import { useNavigate } from "react-router-dom";
import { useFetchTagById, useUpdateTag } from "../../../hook/useTag";
import { ITag } from "../../../interfaces";
import { useEvenEdit } from "../../../contexts/EventContext";
import NFormTag from "@/components/templates/Tag/NFormTag";
import { useRouter } from "next/navigation";

interface EditTagProps {
  id: string; // Định nghĩa kiểu của `id`
}

const EditTag: React.FC<EditTagProps> = ({ id }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setIsEdit } = useEvenEdit(); // Lấy dữ liệu từ context
  const [dataReceived, setDataReceived] = useState(null);
  const { isSuccess, isPending, data, mutate } = useUpdateTag();
  const { mutate: FetchTagById } = useFetchTagById();
  useEffect(() => {
    if (id) {
      FetchTagById(
        { id: id },
        {
          onSuccess: (response) => {
            setDataReceived(response.data.data);
          },
          onError: (error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
          },
        }
      );
    }
  }, [id, FetchTagById]);

  // const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      handleNavigate();
    }
  }, [isSuccess, data]); // Chạy khi `isSuccess` hoặc `data` thay đổi

  const handleNavigate = () => {
    router.push("/tags");
    // navigate(`/dashboard/tag`, { state: dataToSendDashboard });
  };

  const handleFinish = (values: ITag) => {
    // const res = editTag(id, values)
    mutate({ id: id, newData: values });
    setIsEdit(false);
    // mutate(values)
  };

  const initialValues = dataReceived || {};
  if (!dataReceived) {
    return (
      <div>
        <Skeleton className="w-full" active />;
        <Skeleton className="w-full" active />;
        <Skeleton className="w-full" active />;
      </div>
    ); // Hoặc có thể hiển thị một component loading
  }

  return (
    <NFormTag
      dataReceived={dataReceived}
      initialValues={initialValues}
      form={form}
      handleFinish={handleFinish}
      isPending={isPending}
      // evenEdit={evenEdit}
      // setEvenEdit={setEvenEdit}
    />
  );
};

export default EditTag;
