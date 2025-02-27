import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddTeacher from "./const/fieldsForAddTeacher.js";

import useAddTeacher from "./model/useAddTeacher.js";
import { useGoBack } from "../../../shared/model";

export default function AddTeacher() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}/choose-teacher`)
  
  const { error, errorMessage, isLoading, handleFieldChange, handlePost } =
    useAddTeacher(fieldsForAddTeacher);
  return (
    <>
      <div className="container-add-teacher">
        <ErrorMessage isError={error}>
          {errorMessage}
        </ErrorMessage>
        <div className="content-add-teacher">
          <AdminHeader name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddTeacher} />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePost(subjectID)}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Виконується запит" : "Підтвердити"}
        </Button>
      </div>
    </>
  );
}
