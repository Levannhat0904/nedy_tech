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
import { notFound } from "next/navigation";
interface EditTagProps {
  id: string;
}

const EditTag: React.FC<EditTagProps> = ({ id }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setIsEdit } = useEvenEdit();
  const [dataReceived, setDataReceived] = useState(null);
  const { isSuccess, isPending, data, mutate } = useUpdateTag();
  const { mutate: FetchTagById, isError } = useFetchTagById();
  useEffect(() => {
    if (id) {
      FetchTagById(
        { id: id },
        {
          onSuccess: (response) => {
            setDataReceived(response.data.data);
          },
        }
      );
    }
  }, [id, FetchTagById]);
  useEffect(() => {
    if (isSuccess) {
      handleNavigate();
    }
  }, [isSuccess, data]);

  if (isError) {
    notFound();
  }
  const handleNavigate = () => {
    router.push("/tags");
    // navigate(`/dashboard/tag`, { state: dataToSendDashboard });
  };

  const handleFinish = (values: ITag) => {
    mutate({ id: id, newData: values });
    setIsEdit(false);
  };

  const initialValues = dataReceived || {};
  if (!dataReceived) {
    return (
      <div>
        <Skeleton className="w-full" active />;
        <Skeleton className="w-full" active />;
        <Skeleton className="w-full" active />;
      </div>
    );
  }

  return (
    <NFormTag
      dataReceived={dataReceived}
      initialValues={initialValues}
      form={form}
      handleFinish={handleFinish}
      isPending={isPending}
    />
  );
};

export default EditTag;
