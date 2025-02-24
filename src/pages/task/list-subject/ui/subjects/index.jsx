import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Subject } from "../../../../../entities";
import {
  Button,
  AdminPopup,
  ErrorMessage,
} from "../../../../../shared/ui/index.jsx";
import { LoadingSubject } from "../";

import { AdderIcon } from "../../../../../shared/assets/svg";

import { useSelectedSubjects } from "../../model/useSelectedSubjects.js";
import { useRoles } from "../../../../../shared/model";

import adminPopupItems from "../../../../../shared/const/adminPopupItems";

export default function Subjects(props) {
  const navigate = useNavigate();

  const { error, errorMessage, isLoading, selectedSubjects } =
    useSelectedSubjects(props.toggle);
  const { isAdmin } = useRoles();

  return (
    <div className="style-subjects">
      <ErrorMessage error={error}>{errorMessage}</ErrorMessage>
      <AdminPopup
        adminPopup={adminPopupItems}
        showPopup={props.menuState.showMenu}
        popupPosition={props.menuState.menuPosition}
        topTo="/edit-subject"
      />
      {isLoading ? (
        <LoadingSubject />
      ) : (
        selectedSubjects.map((item) => (
          <Subject key={item.id} subject={item} menuState={props.menuState} />
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
