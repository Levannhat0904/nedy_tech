"use client";
import { Layout } from "antd";
import Sidebar from "../../organisms/NSidebar";
import { NFooter, NHeader } from "@/components/molecules";
import { ReactNode, useState } from "react";
interface DashboardLayoutProps {
  children: ReactNode; // Đảm bảo kiểu của children là ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false); // Quản lý trạng thái Drawer

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const toggleDrawer = () => {
    setOpen(!open); // Đổi trạng thái Drawer
  };
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Sidebar
        collapsed={collapsed}
        open={open}
        toggleDrawer={toggleDrawer}
        toggleCollapse={toggleCollapse}
      />
      <Layout
        className={`transition-all duration-700 ${
          collapsed ? "md:ml-[80px]" : "md:ml-[240px]"
        }`}
      >
        <NHeader toggleDrawer={toggleDrawer} collapsed={collapsed} />
        <div style={{ width: "100%", height: "100%", background: "#f0f2f5" }}>
          {children}
        </div>
        <NFooter />
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
