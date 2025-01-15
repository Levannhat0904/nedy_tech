import { NSiderNav } from "@/components/molecules";
import { Drawer } from "antd";
interface SidebarProps {
  collapsed: boolean;
  open: boolean;
  toggleDrawer: () => void;
  toggleCollapse: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  open,
  toggleDrawer,
  toggleCollapse,
}) => {
  return (
    <>
      <Drawer
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        open={open}
        key="left"
        width={240}
        className="!p-0"
        styles={{ body: { padding: 0 } }}
      >
        <NSiderNav collapsed={collapsed} toggleCollapse={toggleCollapse} />
      </Drawer>
      <NSiderNav
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        className="md:block hidden h-auto"
      />
    </>
  );
};
export default Sidebar;
