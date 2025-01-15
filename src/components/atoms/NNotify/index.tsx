import React, { useEffect } from "react";
import { notification, Space, Button } from "antd";
import { useEvenEdit } from "../../../contexts/EventContext";
import { useRouter } from "next/navigation";
const close = () => {
  // console.log('Notification was closed. Either the close button was clicked or duration time elapsed.')
};

const NNotify: React.FC = () => {
  const router = useRouter();
  const { path, setIsEdit, isOpenNotify, setIsOpenNotify } = useEvenEdit();
  const [api, contextHolder] = notification.useNotification();
  const handleDestroyAll = () => {
    api.destroy();
  };
  const handleConfirm = (key: string) => {
    setIsEdit(false);
    router.push(path);
    api.destroy(key);
  };
  useEffect(() => {
    if (isOpenNotify) {
      openNotification();
      setIsOpenNotify(false);
    }
  }, [isOpenNotify, setIsOpenNotify]);

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => handleDestroyAll()}>
          Cancel
        </Button>
        <Button type="primary" size="small" onClick={() => handleConfirm(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: "Notification Title",
      description:
        'A function will be called after the notification is closed (automatically after the "duration" time or manually).',
      btn,
      key,
      onClose: close,
    });
  };

  return <>{contextHolder} </>;
};

export default NNotify;
