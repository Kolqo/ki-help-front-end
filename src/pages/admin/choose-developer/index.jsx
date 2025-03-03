import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { Developers, LoadingUi } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import { useSubmitDevelopers, useSelectedDevelopers } from "./model";
import { useGoBack } from "../../../shared/model";

export default function ChooseDeveloper(props) {
  const { subjectID } = useParams();
  useGoBack(props.isEdit ? `/list-task/edit-task/${subjectID}` : `/list-task/add-task/${subjectID}`);
  
  const { errorSelected, errorMessageSelected, isLoadingSelected, selectedDevelopers } =
    useSelectedDevelopers("ROLE_DEVELOPER");

  const { checkedState, setCheckedState } = useObjState(selectedDevelopers);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);

  const { error, errorMessage, handleSubmitDevelopers } =
    useSubmitDevelopers();

  return (
    <>
      <div className="container-choose-developer">
        <ErrorMessage isError={error || errorSelected}>
          {error ? errorMessage : errorMessageSelected}
        </ErrorMessage>
        {isLoadingSelected ? (
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
            handleSubmitDevelopers(checkedState, subjectID, selectedDevelopers, props.isEdit)
          }
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
