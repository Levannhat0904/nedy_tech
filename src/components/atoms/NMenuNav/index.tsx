import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import Link from "next/link";
// import { Link, NavLink } from 'react-router-dom' sửa
// import useCustomNavigate from '../../../hook/useCustomNavigate' sửa
const items = [
  {
    key: "1",
    label: "Option 1",
    icon: <PieChartOutlined className="custom-classs" />,
    path: "/option1",
    className: "custom-classs",
  },
  {
    key: "2",
    label: "Option 2",
    icon: <DesktopOutlined className="custom-classs" />,
    path: "/option2",
    className: "custom-classs",
  },
  {
    key: "3",
    label: "Tags",
    icon: <DesktopOutlined className="custom-classs" />,
    path: "tags",
    className: "custom-classs",
  },

  {
    key: "sub1",
    label: "User",
    className: "custom-classs",
    icon: <UserOutlined className="!custom-classs" />,
    children: [
      {
        key: "5",
        label: "Tom",
        icon: <UserOutlined className="custom-classs" />,
        path: "/user/tom",
        className: "custom-classs",
      },
      {
        key: "6",
        label: "Bill",
        icon: <UserOutlined className="custom-classs" />,
        path: "/user/bill",
        className: "custom-classs",
      },
      {
        key: "7",
        label: "Alex",
        icon: <UserOutlined className="custom-classs" />,
        path: "/user/alex",
        className: "custom-classs",
      },
    ],
  },
  {
    key: "8",
    label: "Bài viết",
    icon: <TeamOutlined />,
    path: "posts",
    className: "custom-classs",
  },
];
const CustomMenu = () => {
  // const navigate = useCustomNavigate(); sửa
  // const handleNavigate = (to: string) => {
  //   // navigate(to); // Điều hướng đến trang được chỉ định sửa
  // };
  const menuItems = items.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        className: "custom-classs",
        children: item.children.map((child) => ({
          key: child.key,
          icon: child.icon,
          label: <Link href={child.path}>{child.label}</Link>,
          className: "custom-classs",
        })),
      };
    }

    return {
      key: item.key,
      icon: item.icon,
      label: (
        <Link href={item.path}>{item.label}</Link>
        // <div
        //   onClick={() => handleNavigate(item.path)}
        //   style={{ cursor: "pointer" }}
        // >
        //   {item.label}
        // </div>
      ),
      className: item.className,
    };
  });
  // photo booth

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#000",
          },
          Menu: {
            itemActiveBg: "none",
            itemHoverColor: "#eda041",
            itemSelectedColor: "#eda041",
            itemSelectedBg: "none",
            itemColor: "white",
          },
        },
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        className="text-[#038fde] custom-menu bg-[#013366] h-screen"
        items={menuItems}
      />
    </ConfigProvider>
  );
};
export default CustomMenu;
