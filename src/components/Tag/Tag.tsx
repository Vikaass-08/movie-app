import React from "react";
import "./Tag.css";
import { TagProps } from "../../types/tags.type";

const Tag: React.FC<TagProps> = ({
  tagName,
  tagId,
  currentActive,
  tagClickAction,
}) => {
  
  return (
    <span className="tagContainer">
      <button
        className={currentActive == true ? "tagButton active" : "tagButton"}
        onClick={() => tagClickAction(tagId)}
      >
        {tagName}
      </button>
    </span>
  );
};

export default Tag;
