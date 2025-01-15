import React, { useState } from "react";
import { Tag, Tooltip } from "antd";
import { ISector, ITag } from "../../../interfaces";

const TagList: React.FC<{ sectors: ITag[] }> = ({ sectors }) => {
  const maxTags = 2;
  const visibleTags = sectors.slice(0, maxTags);
  const remainingTags = sectors.slice(maxTags);

  const [showMoreTags, setShowMoreTags] = useState(false);
  const getTagIcon = (slug: string, iconUrl?: string): React.ReactNode => {
    // Nếu không có iconUrl, không hiển thị icon
    if (!iconUrl) {
      return null;
    }
    return (
      <img
        src={iconUrl}
        alt={slug}
        style={{ width: 16, height: 16, marginRight: 8 }}
      />
    );
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {visibleTags.map((tag) => (
          <Tooltip key={tag.id} title={`Slug: ${tag.slug}`} placement="top">
            <Tag
              icon={getTagIcon(tag.slug as string, tag.iconUrl)}
              color="#55acee"
              style={{
                margin: "5px",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                height: "30px",
              }}
            >
              {tag.name}
            </Tag>
          </Tooltip>
        ))}
        {showMoreTags &&
          remainingTags.map((tag) => (
            <Tooltip key={tag.id} title={`Slug: ${tag.slug}`} placement="top">
              <Tag
                icon={getTagIcon(tag.slug as string, tag.iconUrl)}
                color="#55acee"
                style={{
                  margin: "5px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  height: "30px",
                }}
              >
                {tag.name}
              </Tag>
            </Tooltip>
          ))}

        {remainingTags.length > 0 && (
          <Tooltip
            title={
              showMoreTags ? "Click to hide tags" : "Click to view more tags"
            }
            placement="top"
          >
            <Tag
              color="default"
              key="more"
              onClick={() => setShowMoreTags(!showMoreTags)}
              style={{
                margin: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                borderColor: "#d9d9d9",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              {showMoreTags ? "Less" : `+${remainingTags.length} more`}
            </Tag>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
interface AProps {
  sectors: ISector[];
}

const Sector: React.FC<AProps> = ({ sectors = [] }) => {
  return <TagList sectors={sectors} />;
};

export default Sector;
