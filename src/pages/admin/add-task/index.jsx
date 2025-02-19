import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage } from "../../../shared/ui";
import { Fields, OptionalMenu } from "./ui";

import fieldsForAddTask from "./const/fieldsForAddTask.js";

import useAddTask from "./model/useAddTask.js";

export default function EditTask() {
  const { error, handleFieldChange, handleValidation } =
  useAddTask(fieldsForAddTask);

  return (
    <>
      <div className="container-add-task">
        <ErrorMessage isError={error}>
          Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів
        </ErrorMessage>
        <div className="content-add-task">
          <AdminHeader className="text-header" name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddTask} />
          <OptionalMenu />
          <p>
            Після підтвердження ви добавите завдання в Kihelp. Будьте уважні,
            перш ніж підтвердити.
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
