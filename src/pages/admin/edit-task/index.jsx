import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import { Fields, OptionalMenu } from "./ui";

import fieldsForEditTask from "./const/fieldsForEditTask.js";

import useEditTask from "./model/useEditTask.js";

export default function EditTask() {
  const { error, handleFieldChange, handleValidation } =
    useEditTask(fieldsForEditTask);

  return (
    <>
      <div className="container-edit-task">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-edit-task">
          <AdminHeader className="text-header" name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditTask} />
          <OptionalMenu />
          <p>
            Після підтвердження всі дані будуть перезаписані. Будьте уважні,
            перш ніж підтвердити зміни.
          </p>
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
