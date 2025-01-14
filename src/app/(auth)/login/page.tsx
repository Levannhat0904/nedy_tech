"use client";
import NLoginPage from "@/components/pages/auth/Login";
import { App } from "antd";
import React from "react";

const Login = () => {
  return (
    <>
      <App>
        <NLoginPage />;
      </App>
    </>
  );
};

export default Login;
