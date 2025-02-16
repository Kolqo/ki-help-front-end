import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForEditSubject from "./const/fieldsForEditTeacher.js";

import useEditTeacher from "./model/useEditTeacher.js";

export default function EditTeacher() {
  const { error, handleFieldChange, handleLengthValidation } =
    useEditTeacher(fieldsForEditSubject);
  return (
    <>
      <div className="container-edit-teacher">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-edit-teacher">
          <AdminHeader name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditSubject} />
        </div>
        <div className="edit-teacher-button-box">
          <Button
            className="blue-button edit-teacher-button"
            onClick={handleLengthValidation}
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </>
  );
}
