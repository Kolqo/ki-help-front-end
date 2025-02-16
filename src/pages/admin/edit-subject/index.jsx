import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForEditSubject from "./const/fieldsForEditSubject.js";

import useEditSubject from "./model/useEditSubject.js";

export default function EditSubject() {
  const { error, handleFieldChange, handleLengthValidation } = useEditSubject(fieldsForEditSubject);
  return (
    <>
      <div className="container-edit-subject">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-edit-subject">
          <AdminHeader name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditSubject}/>
        </div>
        <div className="edit-subject-button-box">
          <Button
            className="blue-button edit-subject-button"
            onClick={handleLengthValidation}
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </>
  );
}
