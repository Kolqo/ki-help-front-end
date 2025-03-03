import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { Arguments, LoadingUi } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useGoBack, useShowPopup } from "../../../shared/model";
import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import { useSelectedArguments, useSubmitArguments } from "./model";

export default function ChooseArgument() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/add-task/${subjectID}`);
  const menuState = useShowPopup();

  const {
    errorSelected,
    errorMessageSelected,
    isLoadingSelected,
    selectedArguments,
    refetch
  } = useSelectedArguments();

  const { checkedState, setCheckedState } = useObjState(selectedArguments);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const handleSubmitArguments = useSubmitArguments(checkedState);

  return (
    <>
      <div className="container-choose-argument">
        <ErrorMessage isError={errorSelected}>
          {errorMessageSelected}
        </ErrorMessage>
        {isLoadingSelected ? (
          <LoadingUi/>
        ) : (
          <Arguments
            isChecked={checkedState}
            setIsChecked={handleCheckboxChangeState}
            menuState={menuState}
            listObject={selectedArguments}
            subjectID={subjectID}
            refetch={refetch}
          />
        )}
        <Button
          className="blue-button fixed-button"
          onClick={() =>
            handleSubmitArguments(checkedState, subjectID)
          }
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
