import React from "react";
import "./styles.css";

import { HistoryTask } from "../../../../../entities";
import getTaskByIdUser from "../../../../../entities/task/api/getTaskByIdUser";
import { Tgs } from "../../../../../shared/ui";
import Moon from "../../assets/tgs/Moon.tgs";

export default function ListTask() {
  const isAnyTransactions = getTaskByIdUser.length > 0;
  return (
    <>
      <div className="style-list-task">
        <p>ІСТОРІЯ ЗАВДАНЬ</p>
        {isAnyTransactions ? (
          <div className="list-task">
            {getTaskByIdUser.map((item) => (
              <HistoryTask key={item.createdAt} task={item}/>
            ))}
          </div>
        ) : (
          <div className="empty-list">
            <Tgs src={Moon} isLoop isAutoplay></Tgs>
            <p>Історії ще немає</p>
            <div>
              Історії ще немає. Щойно ви купите завдання, вона з’явиться
              тут.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
