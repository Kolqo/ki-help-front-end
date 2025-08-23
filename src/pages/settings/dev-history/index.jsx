import "./styles.css";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { ActionPopup, ErrorMessage } from "../../../shared/ui";
import { BottomSheetHistory, HistoryTasks } from "./ui";

import { useGetTaskInProgress, usePatchFile } from "../../../features/task/model";
import { useBottomSheet, useGoBack, useShowPopup } from "../../../shared/hooks";
import { filterHistoryPopupItems } from "./lib";

export default function DevHistory() {
  useGoBack('/settings/dev-panel');
  const { taskStatus } = useParams()

  const [history, setHistory] = useState();
  const [mode, setMode] = useState({
    name: "З АВТОГЕНЕРАЦІЄЮ",
    autoGenerate: true,
  });

  const getTaskInProgressState = useGetTaskInProgress();
  const patchFileState = usePatchFile();

  const bottomSheetState = useBottomSheet(setHistory);
  const showPopupState = useShowPopup();

  return (
    <>
      <div className="container-history-task">
        <ErrorMessage errors={[getTaskInProgressState.error]} />
        {showPopupState.position && (
          <ActionPopup
            ref={showPopupState.menuRef}
            items={filterHistoryPopupItems(setMode)}
            onClick={showPopupState.close}
            position={showPopupState.position}
          />
        )}
        <HistoryTasks
          isLoading={getTaskInProgressState.isLoading}
          getTaskInProgressState={getTaskInProgressState}
          history={history}
          setHistory={setHistory}
          bottomSheetState={bottomSheetState}
          showPopupState={showPopupState}
          mode={mode}
          taskStatus={taskStatus}
        />
        <BottomSheetHistory
          bottomSheetState={bottomSheetState}
          patchFileState={patchFileState}
          history={history}
        />
      </div>
    </>
  );
}
