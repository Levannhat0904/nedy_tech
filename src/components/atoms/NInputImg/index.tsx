import React, { useState, useEffect } from "react";
import { Form, FormInstance, Upload, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUploadImage } from "../../../hook/useUploadImage";
import { ITag } from "../../../interfaces";

interface InputImgProps {
  name: string;
  label: string;
  form: FormInstance;
  initialValues?: ITag;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NInputImg: React.FC<InputImgProps> = ({
  name,
  label,
  initialValues,
  form,
  setUploading,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutate, isPending, isError, isSuccess, error, data } =
    useUploadImage();
  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
    const file = newFileList[newFileList.length - 1]?.originFileObj;
    if (file) {
      mutate(file);
    }
  };
  const defaultFileList = initialValues?.featureImage
    ? ([
        {
          uid: "-1",
          name: "feature-image.jpg",
          status: "done",
          url: initialValues.featureImage,
        },
      ] as UploadFile<UploadFile>[])
    : [];
  useEffect(() => {
    setFileList(defaultFileList);
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      form.setFieldsValue({ [name]: data });
      setUploading(false);
    } else if (isPending) {
      setUploading(true);
    }
  }, [isPending, isError, isSuccess, data, error, form]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form.Item label={label} name={name}>
      <Upload
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {uploadButton}
      </Upload>
    </Form.Item>
  );
};

export default NInputImg;
