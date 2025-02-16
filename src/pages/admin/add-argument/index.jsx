import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddArgument from "./const/fieldsForAddArgument.js";

import useAddArgument from "./model/useAddArgument.js";

export default function EditDeveloper() {
  const { error, handleFieldChange, handleLengthValidation } =
    useAddArgument(fieldsForAddArgument);
  return (
    <>
      <div className="container-add-subject">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-add-subject">
          <AdminHeader name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddArgument} />
        </div>
        <div className="add-subject-button-box">
          <Button
            className="blue-button add-subject-button"
            onClick={handleLengthValidation}
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </>
  );
}
