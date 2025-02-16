import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities";
import { Adder, Button, ErrorMessage } from "../../../../../shared/ui";
import { useRoles } from "../../model/useRoles.js";
import { useRolesActions } from "../../model/useRolesActions.js";
import { useErrorMessage } from "../../../../../shared/model";
import getRoles from "../../const/getRoles.js";

export default function Creator() {
  const navigate = useNavigate();
  const { selectedRoles, handleRoleSelect, validateSelection } = useRoles();

  const { handleDoneClick } = useRolesActions();
  const { error, setError } = useErrorMessage();

  return (
    <div className="container-roles">
      <ErrorMessage isError={error}>
        Будь ласка, оберіть лише одного розробника.
      </ErrorMessage>
      <div className="style-roles">
        {getRoles.map((role) => (
          <CheckBoxList
            key={role.id}
            className="role"
            isChecked={selectedRoles[role.id] || false}
            setIsChecked={(checked) => handleRoleSelect(role.id, checked)}
          >
            {role.name}
          </CheckBoxList>
        ))}
        <Adder className="role" isIcon>
          Добавити роль
        </Adder>
      </div>

      <div className="no-underline roles-button-box">
        <Button
          className="blue-button roles-button"
          onClick={handleDoneClick(validateSelection, navigate, setError)}
        >
          Готово
        </Button>
      </div>
    </div>
  );
}
