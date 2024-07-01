import React from "react";
import "./Tag.css";

interface TagProps {
  tagClickAction: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  tagName: string;
  currentActive: boolean;
}

const Tag: React.FC<TagProps> = ({
  tagName,
  currentActive,
  tagClickAction,
}) => {
  
  return (
    <span className="tagContainer">
      <button
        className={currentActive == true ? "tagButton active" : "tagButton"}
        onClick={tagClickAction}
      >
        {tagName}
      </button>
    </span>
  );
};

export default Tag;
