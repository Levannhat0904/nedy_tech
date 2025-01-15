"use client";
import { App, Breadcrumb, FormInstance, Layout, notification } from "antd";
import NFormSection from "../../organisms/NFormSection";
import useCustomNavigate from "../../../hook/useCustomNavigate";
import { ITag } from "../../../interfaces";
import NNotify from "@/components/atoms/NNotify";

interface PageTemplateProps {
  dataReceived?: ITag;
  initialValues?: ITag;
  form: FormInstance;
  handleFinish: (values: object) => void;
  isPending: boolean;
  autoCreateSlug?: boolean;
}

const NFormTag: React.FC<PageTemplateProps> = ({
  autoCreateSlug,
  dataReceived,
  initialValues,
  form,
  handleFinish,
  isPending,
}) => {
  const navigate = useCustomNavigate();
  const [, contextHolder] = notification.useNotification();
  const handleNavigate = (to: string) => {
    navigate(to);
  };
  return (
    <Layout>
      {contextHolder}
      <NNotify />
      <Breadcrumb
        className="my-2 mx-2"
        items={[
          {
            title: (
              <span
                onClick={() => handleNavigate("/tags")}
                style={{ cursor: "pointer" }}
              >
                Tag
              </span>
            ),
          },
          { title: dataReceived?.name },
        ]}
      />
      <App>
        <NFormSection
          autoCreateSlug={autoCreateSlug}
          initialValues={initialValues}
          form={form}
          handleFinish={handleFinish}
          isPending={isPending}
        />
      </App>
    </Layout>
  );
};

export default NFormTag;
