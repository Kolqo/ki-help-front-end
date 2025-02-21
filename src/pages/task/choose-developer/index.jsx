import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import Creator from "./ui/creator";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import { useGoBack} from "../../../shared/model";
import { useSubmitCreators, useSelectCreators } from "./model";

export default function ChooseArgument() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}`);

  const selectedCreators = useSelectCreators(subjectID)
  const { checkedState, setCheckedState } = useObjState(selectedCreators);
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
          listObject={selectedCreators}
        />
        <Button
          className="blue-button fixed-button"
          onClick={() => handleSubmitUserCreator(checkedState, subjectID, selectedCreators)}
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
