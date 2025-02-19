import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddTeacher from "./const/fieldsForAddTeacher.js";

import useAddTeacher from "./model/useAddTeacher.js";

export default function EditDeveloper() {
  const { error, handleFieldChange, handleValidation } =
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
        <Button
          className="blue-button fixed-button"
          onClick={handleValidation}
        >
          Підтвердити
        </Button>
      </div>
    </>
  );
}
