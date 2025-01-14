"use client";
import React from "react";
import QueryProvider from "@/lib/QueryProvider";
import "@ant-design/v5-patch-for-react-19";
import { App } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/utils";
import { AuthorsProvider } from "@/contexts/AuthorsContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return <QueryProvider>{children}</QueryProvider>;
  const router = useRouter();
  useEffect(() => {
    const token = getAccessToken(); // Lấy token từ localStorage
    if (!token) {
      router.push("/login"); // Chuyển hướng nếu chưa đăng nhập
    }
  }, []);
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthorsProvider>
            <App>{children}</App>
          </AuthorsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
