import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForEditArgument from "./const/fieldsForEditArgument.js";

import useEditArgument from "./model/useEditArgument.js";
import { useGoBack } from "../../../shared/model";

export default function EditDeveloper() {
  const location = useLocation();
  const { subjectID } = useParams();
  const { argument } = location.state || {};
  useGoBack(`/list-task/add-task/${subjectID}/choose-argument`);
  console.log("subjectID: ", subjectID, "argument: ", argument);
  const { error, errorMessage, isLoading, handleFieldChange, handlePatch } =
    useEditArgument(fieldsForEditArgument);
  return (
    <>
      <div className="container-edit-developer">
        <ErrorMessage isError={error}>
          {errorMessage}
        </ErrorMessage>
        <div className="content-edit-developer">
          <AdminHeader name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditArgument} />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePatch(argument.id, subjectID)}
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
