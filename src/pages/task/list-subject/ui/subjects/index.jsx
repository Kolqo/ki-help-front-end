import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Subject } from "../../../../../entities";
import { Button, ErrorMessage, DeletePopup } from "../../../../../shared/ui";
import { LoadingSubject } from "../";

import { AdderIcon } from "../../../../../shared/assets/svg";

import { useDeleteSubject, useSelectedSubjects } from "../../model";
import { useRoles } from "../../../../../shared/model";

export default function Subjects(props) {
  const navigate = useNavigate();

  const [subjectId, setSubjectId] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { error, errorMessage, isLoading, selectedSubjects, refetch } =
    useSelectedSubjects(props.toggle);
  const { errorDelete, errorDeleteMessage, isLoadingMessage, handleDelete } =
    useDeleteSubject();
  const { isAdmin } = useRoles();

  const deleteSubject = async () => {
    try {
      await handleDelete(subjectId);
      setPopupOpen(false)
      refetch();
    } catch {} 
  }

  return (
    <div className="style-subjects">
      <ErrorMessage isError={error || errorDelete}>
        {error ? errorMessage : errorDeleteMessage}
      </ErrorMessage>
      {isPopupOpen && (
        <DeletePopup
          onClickCancel={() => setPopupOpen(false)}
          onClickConfirm={() => deleteSubject(subjectId)}
        />
      )}
      {isLoading ? (
        <LoadingSubject />
      ) : (
        selectedSubjects.map((item) => (
          <Subject
            key={item.id}
            subject={item}
            menuState={props.menuState}
            setSubjectId={setSubjectId}
            setPopupOpen={setPopupOpen}
          />
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
