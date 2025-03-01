import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { Developers, LoadingUi } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import {
  useObjState,
  useChangeObjState,
} from "../../../entities/checkbox-list/model";

import { useSubmitDevelopers, useSelectDevelopers } from "./model";

export default function ChooseArgument() {
  const { subjectID } = useParams();
  console.log("subjectID", subjectID);
  const { errorSelected, errorMessageSelected, selectedDevelopers } =
    useSelectDevelopers("ROLE_DEVELOPER");

  const { checkedState, setCheckedState } = useObjState(selectedDevelopers);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);

  const { error, errorMessage, isLoading, handleSubmitDevelopers } =
    useSubmitDevelopers();

  return (
    <>
      <div className="container-choose-developer">
        <ErrorMessage isError={error || errorSelected}>
          {error ? errorMessage : errorMessageSelected}
        </ErrorMessage>
        {isLoading ? (
          <LoadingUi />
        ) : (
          <Developers
            isChecked={checkedState}
            setIsChecked={handleCheckboxChangeState}
            listObject={selectedDevelopers}
          />
        )}
        <Button
          className="blue-button fixed-button"
          onClick={() =>
            handleSubmitDevelopers(checkedState, subjectID, selectedDevelopers)
          }
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
