import React, { useState } from "react";
import "./styles.css";

import { ButtonsContent, FileItem, TaskDeveloperContent } from "./ui/index.js";

import { useShowPopup } from "../../shared/model"

import taskDeveloperItems from "./const/taskDeveloperItems.jsx";

export default function TaskDeveloper(props) {
  const [fileValue, setFileValue] = useState(null);
  const [isExpandedArgs, setExpandedArgs] = useState();

  const menuState = useShowPopup();

  const isFile = fileValue && fileValue.length > 0;

  return (
    <>
      <div className="style-task-developer">
        {taskDeveloperItems(props.taskDeveloper).map((item) => (
          <TaskDeveloperContent
            key={item.id}
            item={item}
            isExpandedArgs={isExpandedArgs}
            onClick={() => setExpandedArgs(!isExpandedArgs)}
          />
        ))}
        <FileItem
          isFile={isFile}
          fileValue={fileValue}
          menuState={menuState}
          onChange={(e) => setFileValue(e.target.files)}
        />
        <ButtonsContent />
      </div>
    </>
  );
}
