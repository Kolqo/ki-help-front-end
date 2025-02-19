import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import Creator from "./ui/creator";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import useSubmitCreators from "./model/useSubmitCreators";

import getCreators from "../../../entities/checkbox-list/api/getCreators";

export default function ChooseArgument() {
  const { subjectID } = useParams();
  const { checkedState, setCheckedState } = useObjState(getCreators);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserCreator, error } = useSubmitCreators();

  return (
    <>
      <div className="container-choose-creator">
        <ErrorMessage isError={error}>
          Будь ласка, оберіть лише одного викладача.
        </ErrorMessage>
        <Creator
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          listObject={getCreators}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() => handleSubmitUserCreator(checkedState, subjectID, getCreators)}
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
