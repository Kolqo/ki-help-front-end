import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Subject } from "../../../../../entities";
import {
  Button,
  ErrorMessage,
} from "../../../../../shared/ui/index.jsx";
import { LoadingSubject } from "../";

import { AdderIcon } from "../../../../../shared/assets/svg";

import { useDeleteSubject, useSelectedSubjects } from "../../model";
import { useRoles } from "../../../../../shared/model";

export default function Subjects(props) {
  const navigate = useNavigate();

  const { error, errorMessage, isLoading, selectedSubjects, refetch } =
    useSelectedSubjects(props.toggle);
  const { errorDelete, errorDeleteMessage, isLoadingMessage, handleDelete } =
    useDeleteSubject();
  const { isAdmin } = useRoles();

  return (
    <div className="style-subjects">
      <ErrorMessage isError={error || errorDelete}>{error ? errorMessage : errorDeleteMessage}</ErrorMessage>
      {isLoading ? (
        <LoadingSubject />
      ) : (
        selectedSubjects.map((item) => (
          <Subject key={item.id} subject={item} menuState={props.menuState} handleDelete={handleDelete} refetch={refetch}/>
        ))
      )}
      {isAdmin() && (
        <Button
          className="gray-button button-subject"
          leftIcon={<AdderIcon />}
          onClick={() => navigate(`/add-subject`)}
        >
          Добавити предмет
        </Button>
      )}
    </div>
  );
}
