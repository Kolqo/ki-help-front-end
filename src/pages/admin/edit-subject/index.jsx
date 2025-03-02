import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForEditSubject from "./const/fieldsForEditSubject.js";

import useEditSubject from "./model/useEditSubject.js";
import useGoBack from "../../../shared/model/useGoBack.js";

export default function EditSubject() {
  useGoBack(`/`)
  const location = useLocation();
  const { subject } = location.state || {};

  const { error, errorMessage, isLoading, handleFieldChange, handlePatch } =
    useEditSubject(fieldsForEditSubject);
  return (
    <>
      <div className="container-edit-subject">
        <ErrorMessage isError={error}>
          {errorMessage}
        </ErrorMessage>
        <div className="content-edit-subject">
          <AdminHeader name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditSubject} />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePatch(subject)}
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
