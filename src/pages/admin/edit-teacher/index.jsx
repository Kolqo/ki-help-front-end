import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForEditSubject from "./const/fieldsForEditTeacher.js";

import useEditTeacher from "./model/useEditTeacher.js";
import { useGoBack } from "../../../shared/model";

export default function EditTeacher() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}/choose-teacher`)
  const location = useLocation();
  const { teacher } = location.state || {};
  
  const { error, errorMessage, isLoading, handleFieldChange, handlePut } =
    useEditTeacher(fieldsForEditSubject);
  return (
    <>
      <div className="container-edit-teacher">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-edit-teacher">
          <AdminHeader name="Адмін панель">
            Редагуй або видаляй предмети, викладача або завдання
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForEditSubject} />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePut(teacher, subjectID)}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
