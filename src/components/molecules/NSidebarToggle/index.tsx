import React from "react";
import NCollapButton from "../../atoms/NCollapButton";
import { NLogoWieldi } from "@/components/atoms";

interface SidebarToggleProps {
  collapsed: boolean;
  onToggle?: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  collapsed,
  onToggle,
}) => (
  <div className="flex justify-center md:justify-start items-center px-4 h-12">
    <div className="flex flex-wrap gap-4 justify-center content-center">
      <div className="md:block hidden">
        <NCollapButton collapsed={collapsed} onToggle={onToggle} />
      </div>
      <NLogoWieldi />
    </div>
  </div>
);

export default SidebarToggle;
