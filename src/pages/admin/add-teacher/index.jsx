import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddTeacher from "./const/fieldsForAddTeacher.js";

import useAddTeacher from "./model/useAddTeacher.js";

export default function EditDeveloper() {
  const { error, handleFieldChange, handleLengthValidation } =
  useAddTeacher(fieldsForAddTeacher);
  return (
    <>
      <div className="container-add-teacher">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-add-teacher">
          <AdminHeader name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddTeacher} />
        </div>
        <div className="add-teacher-button-box">
          <Button
            className="blue-button add-teacher-button"
            onClick={handleLengthValidation}
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </>
  );
}
