import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddSubject from "./const/fieldsForAddSubject.js";

import useAddSubject from "./model/useAddSubject.js";
import { useGoBack } from "../../../shared/model";

export default function EditDeveloper() {
  useGoBack(`/`)
  const {
    error,
    errorMessage,
    isLoading,
    handleFieldChange,
    handlePost,
  } = useAddSubject(fieldsForAddSubject);

  return (
    <>
      <div className="container-add-subject">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-add-subject">
          <AdminHeader name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddSubject} />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePost()}
          disabled={isLoading}
          leftIcon={
            isLoading && (
              <Loading className="buying-task-spinner" />
            )
          }
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
