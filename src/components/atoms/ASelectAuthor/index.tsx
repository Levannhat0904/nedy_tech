import React from "react";
import { Avatar, Select, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IAsset, IAuthor } from "../../../interfaces";

interface FilterSelectProps {
  items: IAsset[] | IAuthor[] | undefined;
  selectedItems: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
}

const selectItemComponent = (item: IAsset[] | IAuthor[] | undefined) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Avatar
      style={{ backgroundColor: "#87d068" }}
      icon={
        !(item as IAuthor).avatar &&
        !(item as IAsset).iconUrl && <UserOutlined />
      }
      src={(item as IAuthor).avatar || (item as IAsset).iconUrl}
    />
    <span style={{ marginLeft: 8 }}>{(item as IAsset).name}</span>
  </div>
);

const FilterSelect: React.FC<FilterSelectProps> = ({
  items,
  selectedItems,
  onChange,
  placeholder = "Please select",
}) => (
  <div className="w-60">
    <Select
      mode="multiple"
      value={selectedItems}
      size="large"
      maxTagCount={1}
      style={{ width: "100%" }}
      placeholder={placeholder}
      onChange={onChange}
      maxTagPlaceholder={(omittedValues) => (
        <Tooltip
          title={omittedValues.map(({ label }) => label)} // Nối các nhãn thành chuỗi
          mouseEnterDelay={0.5} // Thêm độ trễ cho tooltip khi hover
        >
          <span>+{omittedValues.length}</span>
        </Tooltip>
      )}
    >
      {items?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {selectItemComponent(item as IAuthor[] | IAsset[])}
        </Select.Option>
      ))}
    </Select>
  </div>
);

export default FilterSelect;
