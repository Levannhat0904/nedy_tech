"use client";
import React, { useEffect } from "react";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { useAddTag } from "../../../hook/useTag";
import NFormTag from "@/components/templates/Tag/NFormTag";
const AddTag = () => {
  const [form] = Form.useForm();
  const { isSuccess, isPending, data, mutate } = useAddTag();
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/tags/edit/${data?.data.data.id}`);
  };
  const handleFinish = (values: object) => {
    mutate(values);
  };
  useEffect(() => {
    if (isSuccess) {
      handleNavigate();
    }
  });
  return (
    <NFormTag
      autoCreateSlug={true}
      form={form}
      handleFinish={handleFinish}
      isPending={isPending}
    />
  );
};

export default AddTag;
