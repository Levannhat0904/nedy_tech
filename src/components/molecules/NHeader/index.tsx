import React from "react";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { NInputSearch } from "../../atoms";
import { removeAccessToken } from "../../../utils";
interface HeaderProps {
  toggleDrawer: () => void;
  collapsed: boolean;
}
const MyHeader: React.FC<HeaderProps> = ({ collapsed, toggleDrawer }) => {
  const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
  };
  return (
    <Header className="bg-white sticky top-0 z-30 flex justify-center items-center w-full pl-0 pr-0">
      <div className="flex justify-center items-center h-full">
        <Button
          type="primary"
          onClick={toggleDrawer}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          className="md:hidden flex ml-2 bg-transparent text-black hover:!bg-transparent hover:!text-black border-none"
        />
      </div>
      <NInputSearch />
      <div className="mr-3 text-white  content-center justify-center">
        <Button onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
      </div>
    </Header>
  );
};

export default MyHeader;
