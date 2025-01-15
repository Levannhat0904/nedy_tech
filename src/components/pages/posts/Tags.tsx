import React, { useState } from "react";
import { Tag, Tooltip } from "antd";
import { ITag } from "../../../interfaces";

const TagList: React.FC<{ tags: ITag[] }> = ({ tags }) => {
  const maxTags = 2;
  const visibleTags = tags.slice(0, maxTags);
  const remainingTags = tags.slice(maxTags);

  const [showMoreTags, setShowMoreTags] = useState(false);

  const getTagIcon = (slug: string, iconUrl?: string): React.ReactNode => {
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
  tags: ITag[];
}

const Tags: React.FC<AProps> = ({ tags = [] }) => {
  return <TagList tags={tags} />;
};

export default Tags;
