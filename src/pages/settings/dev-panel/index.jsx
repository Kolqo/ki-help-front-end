import React from "react";
import "./styles.css";

import { LoadingTaskDeveloper, ListTaskDeveloper } from "./ui";
import { ErrorMessage } from "../../../shared/ui";

import { useSelectedTasksDeveloper } from "./model";
import { useGoBack } from "../../../shared/model";

export default function DevPanel() {
  useGoBack(`/settings`);
  const { error, errorMessage, isLoading, selectedTasksDeveloper } =
    useSelectedTasksDeveloper();

  return (
    <>
      <div className="container-dev-panel">
        <ErrorMessage error={error}>{errorMessage}</ErrorMessage>
        {isLoading ? (
          <LoadingTaskDeveloper />
        ) : (
          <ListTaskDeveloper selectedTasksDeveloper={selectedTasksDeveloper}/>
        )}
      </div>
    </>
  );
}
