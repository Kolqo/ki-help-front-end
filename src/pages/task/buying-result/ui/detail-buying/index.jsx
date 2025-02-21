import React from "react";
import "./styles.css";

import { Folder } from "../../assets";
import { TimeFormatter } from "../../../../../shared/ui";

export default function DetailBuying(props) { // Можливо переробити, коли будеш підключати бек
  return (
    <div className="style-detail-buying">
      <div className="content-detail-buying">
        <div className="detail">
          <p>Статус</p>
          <span>Успішно</span>
        </div>
        <div className="detail">
          <p>Від</p>
          <span>{props.processTask.developerName}</span>
        </div>
        <div className="detail">
          <p>Назва предмету</p>
          <span>{props.processTask.subjectName}</span>
        </div>
        <div className="detail">
          <p>Назва завдання</p>
          <span>{props.processTask.taskTitle}</span>
        </div>
        {props.isAutoGive && (
          <div className="file">
            <img src={Folder}></img>
            <div>
              <p>{props.processTask.fileName}</p>
              <p>
                Створено: <span><TimeFormatter utcDateString={props.processTask.createdAt}/></span>
              </p>
            </div>
          </div>
        )}
      </div>
      {!props.isAutoGive && (
        <div className="developer-text">
          {props.processTask.message}
        </div>
      )}
    </div>
  );
}
