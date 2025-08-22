import { useState } from "react";
import "./styles.css";

import { ErrorMessage } from "../../shared/ui/index.jsx";
import { ButtonsContent, FileItem, TaskDeveloperContent } from "./ui/index.js";

import { useShowPopup } from '../../shared/hooks'

import taskDeveloperItems from "./const/taskDeveloperItems.jsx";
//import { useSendTask } from "../../pages/settings/dev-panel/model"

export default function TaskDeveloper(props) {
  const [fileValue, setFileValue] = useState(null);
  const [isExpandedArgs, setExpandedArgs] = useState();

  const menuState = useShowPopup();
  //const sendTask = useSendTask();

  const isFile = fileValue && fileValue.length > 0;

  return (
    <>
      <div className="style-task-developer">
        {/*<ErrorMessage isError={sendTask.error}>
          {sendTask.errorMessage}
        </ErrorMessage>
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
          onChange={(e) => setFileValue(Array.from(e.target.files))}
        />
        <ButtonsContent sendTask={sendTask} fileValue={fileValue} taskDeveloper={props.taskDeveloper} refetch={props.refetch}/>*/}
      </div>
    </>
  );
}
