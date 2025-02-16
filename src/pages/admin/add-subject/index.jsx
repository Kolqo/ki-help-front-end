import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddSubject from "./const/fieldsForAddSubject.js";

import useAddSubject from "./model/useAddSubject.js";

export default function EditDeveloper() {
  const { error, handleFieldChange, handleLengthValidation } =
    useAddSubject(fieldsForAddSubject);
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
          <Fields onChange={handleFieldChange} fields={fieldsForAddSubject} />
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
