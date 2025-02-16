import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForEditArgument from "./const/fieldsForEditArgument.js";

import useEditArgument from "./model/useEditArgument.js";

export default function EditDeveloper() {
  const { error, handleFieldChange, handleLengthValidation } = useEditArgument(fieldsForEditArgument);
  return (
    <>
      <div className="container-edit-developer">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-edit-developer">
          <AdminHeader name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditArgument}/>
        </div>
        <div className="edit-developer-button-box">
          <Button
            className="blue-button edit-developer-button"
            onClick={handleLengthValidation}
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </>
  );
}
