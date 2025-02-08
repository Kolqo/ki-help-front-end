import React from "react";
import "./styles.css";

import { FileCard } from "../../../../../shared/ui";
import { FileIcon, CrossIcon } from "../../assets";

export default function GroupFiles(props) {
  return (
    <>
      <div className="style-group-files">
        {props.files.map((file, index) => (
          <FileCard
            key={index}
            index={index}
            icon={<FileIcon />}
            crossIcon={<CrossIcon />}
            onDelete={props.onDelete}
          >
            {file.name}
          </FileCard>
        ))}
      </div>
    </>
  );
}
