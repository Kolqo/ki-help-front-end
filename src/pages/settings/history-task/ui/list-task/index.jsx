import React from "react";
import "./styles.css";

import { HistoryTask } from "../../../../../entities";
import { Tgs, ErrorMessage } from "../../../../../shared/ui";
import LoadingHistoryTask from "../loading-history-task";

import useSelectHistoryTasks from "../../model/useSelectHistoryTasks.js";

import Moon from "../../assets/tgs/Moon.tgs";

export default function ListTask(props) {
  const { error, errorMessage, isLoading, selectedHistoryTasks } =
    useSelectHistoryTasks(props.telegramId);
  const isAnyTransactions = selectedHistoryTasks.length > 0 || isLoading;
  return (
    <>
      <div className="style-list-task">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <p>ІСТОРІЯ ЗАВДАНЬ</p>
        {isAnyTransactions ? (
          isLoading ? (
            <LoadingHistoryTask />
          ) : (
            <div className="list-task">
              {selectedHistoryTasks.map((item) => (
                <HistoryTask key={item.createdAt} task={item} />
              ))}
            </div>
          )
        ) : (
          <div className="empty-list">
            <Tgs src={Moon} isLoop isAutoplay></Tgs>
            <p>Історії ще немає</p>
            <div>
              Історії ще немає. Щойно ви купите завдання, вона з’явиться тут.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
