import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities";
import { Adder, Button, ErrorMessage } from "../../../../../shared/ui";
import { useCreators } from "../../model/useCreators";
import { useCreatorsActions } from "../../model/useCreatorsActions";
import { useErrorMessage } from "../../../../../shared/model/useErrorMessage.js";
import getCreators from "../../../../../entities/checkbox-list/api/getCreators";

export default function Creator(props) {
  const navigate = useNavigate();
  const { selectedCreators, handleCreatorSelect, validateSelection } =
    useCreators();

  const { handleDoneClick } = useCreatorsActions();
  const { error, setError } = useErrorMessage();

  return (
    <div className="container-creators">
      <ErrorMessage isError={error}>Будь ласка, оберіть лише одного розробника.</ErrorMessage>
      <div className="style-creators">
        {getCreators.map((creator) => (
          <CheckBoxList
            key={creator.id}
            className="creator"
            isChecked={selectedCreators[creator.id] || false}
            setIsChecked={(checked) => handleCreatorSelect(creator.id, checked)}
          >
            {creator.name}
          </CheckBoxList>
        ))}
        <Adder className="creator">Добавити розробника</Adder>
      </div>

      <div className="no-underline creators-button-box">
        <Button
          className="blue-button creators-button"
          onClick={handleDoneClick(
            validateSelection,
            navigate,
            props.subjectID,
            setError
          )}
        >
          Готово
        </Button>
      </div>
    </div>
  );
}
