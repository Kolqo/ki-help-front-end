import React from "react";
import "./styles.css";

import Developers from "./ui/developers";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model";
import useSubmitArguments from "./model/useSubmitDevelopers";

import getCreators from "../../../entities/checkbox-list/api/getCreators";

export default function ChooseArgument() {
  const { checkedState, setCheckedState } = useObjState(getCreators);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { handleSubmitUserCourse, error } = useSubmitArguments(checkedState);

  return (
    <>
      <div className="container-choose-developer">
        <ErrorMessage isError={error}>
          Будь ласка, оберіть лише одного викладача.
        </ErrorMessage>
        <Developers
          isChecked={checkedState}
          setIsChecked={handleCheckboxChangeState}
          listObject={getCreators}
        />
        <Button
          className="blue-button developer-button"
          onClick={() => handleSubmitUserCourse(checkedState)}
        >
          Вибрати
        </Button>
      </div>
    </>
  );
}
