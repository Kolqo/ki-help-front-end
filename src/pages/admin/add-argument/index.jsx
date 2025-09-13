import { useParams } from "react-router-dom";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddArgument from "./const/fieldsForAddArgument.js";

import useAddArgument from "./model/useAddArgument.js";

import { useGoBack } from "../../../shared/hooks"

export default function EditDeveloper() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/add-task/${subjectID}/choose-argument`);
  const { error, errorMessage, isLoading, handleFieldChange, handlePost } =
    useAddArgument(fieldsForAddArgument);
  return (
    <>
      <div className="container-add-subject">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-add-subject">
          <AdminHeader name="Адмін панель">
            Добавляй предмети, викладача, завдання та інше.
          </AdminHeader>
          <Fields onChange={handleFieldChange} fields={fieldsForAddArgument} />
        </div>
        <Button
          className="blue-button fixed-button"
          onClick={() => handlePost(subjectID)}
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
