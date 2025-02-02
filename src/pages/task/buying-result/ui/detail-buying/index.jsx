import React from "react";
import "./styles.css";

import { Folder } from "../../assets";

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
          <span>{props.task.developer.username}</span>
        </div>
        <div className="detail">
          <p>Назва предмету</p>
          <span>{props.task.teacher.subject.name}</span>
        </div>
        <div className="detail">
          <p>Назва завдання</p>
          <span>{props.task.title}</span>
        </div>
        {props.isAutoGive && (
          <div className="file">
            <img src={Folder}></img>
            <div>
              <p>23723481237_1.zip</p>
              <p>
                Створено: <span>Сьогодні, 21:00</span>
              </p>
            </div>
          </div>
        )}
      </div>
      {!props.isAutoGive && (
        <div className="developer-text">
          Протягом 1 години розробник відпише вам, щоб уточнити деталі для
          подальшої розробки завдання відносно вашого запиту.
        </div>
      )}
    </div>
  );
}
