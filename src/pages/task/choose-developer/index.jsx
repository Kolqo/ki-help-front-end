import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { Creator, LoadingUi } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import {
  useObjState,
  useChangeObjState,
} from "../../../entities/checkbox-list/model";
import { useGoBack } from "../../../shared/model";
import { useSubmitCreators, useSelectCreators } from "./model";

export default function ChooseArgument() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}`);

  const { errorRender, errorMessage, isLoading, selectedCreators } =
    useSelectCreators(subjectID);

  const { checkedState, setCheckedState } = useObjState(selectedCreators);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserCreator, error } = useSubmitCreators();

  const isCreators = selectedCreators.length > 0;

  return (
    <>
      <div className="container-choose-creator">
        <ErrorMessage isError={error || errorRender}>
          {error ? "Будь ласка, оберіть лише одного викладача." : errorMessage}
        </ErrorMessage>
        {isLoading ? (
          <LoadingUi />
        ) : (
          isCreators && (
            <Creator
              isChecked={checkedState}
              setIsChecked={handleCheckboxChangeState}
              listObject={selectedCreators}
            />
          )
        )}
        <Button
          className="blue-button fixed-button"
          onClick={() =>
            handleSubmitUserCreator(checkedState, subjectID, selectedCreators)
          }
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
