"use client";
import React, { useRef, useState } from "react";
import { ACheckbox, AButton } from "../../atoms";
import { useMutation } from "@tanstack/react-query";
import {
  App,
  CheckboxChangeEvent,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { ILoginRequest, ILoginResponse } from "../../../interfaces";
import { NSocialLogin } from "@/components/molecules";
import { loginWithAxios } from "@/api/login";
import { useRouter } from "next/navigation";
type NotificationType = "success" | "info" | "warning" | "error";
const OSignInForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    message.loading({ content: "Đang xử lý...", key: "login", duration: 0 });
    mutation.mutate(values);
  };
  const mutation = useMutation({
    mutationFn: (data: ILoginRequest) => loginWithAxios(data),
    onSuccess: (data) => {
      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
      openNotificationWithIcon(
        "success",
        "Đăng nhập thành công",
        "Đăng nhập thành công"
      );
      message.destroy("login");
      // if (router.isReady) {
      router.push("/");
      // }
    },
    onError: (error: ILoginResponse) => {
      setLoading(false);
      openNotificationWithIcon(
        "error",
        "Login failed",
        error.response?.data.meta.internalMessage || "Có lỗi xảy ra!"
      );
    },
  });

  const onFinishFailed = () => {
    setLoading(false);
    message.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleFocus = () => {
    setLoading(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <App>
      <Form
        id="basic"
        className="ant-form rounded-lg bg-white"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {contextHolder}
        <div className="mb-4">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="ant-form-item mb-4 flex items-center">
          <ACheckbox
            className="mr-2"
            checked={isChecked}
            onChange={handleChange}
          />
          <span>by signing up, I accept</span>
          <a
            href="/terms-and-conditions"
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            Term &amp; Condition
          </a>
        </div>
        <div className="ant-form-item mb-4 flex">
          <AButton
            loading={loading}
            type="primary"
            htmlType="submit"
            onClick={handleFocus}
            text="Sign In"
          />
          <span className="mr-2 mt-2 block text-center">or</span>
          <a
            href="/signup"
            className="mt-2 block text-center text-blue-500 hover:text-blue-700"
          >
            Sign Up
          </a>
        </div>
        <div className="flex-s mt-4 flex flex-wrap justify-between self-start">
          <span>or connect with</span>
          <NSocialLogin
            onGoogleLogin={() => {}}
            onFacebookLogin={() => {}}
            onGithubLogin={() => {}}
            onTwitterLogin={() => {}}
          />
        </div>
        <div className="gx-text-light text-sm text-[#ababab] mt-4 ">
          demo user email: <span className="font-bold">anhnv.jm@gmail.com</span>{" "}
          and password: <span className="font-bold">abc@123X</span>
        </div>
      </Form>
    </App>
  );
};

export default OSignInForm;
