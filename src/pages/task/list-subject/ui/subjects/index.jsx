import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Subject } from "../../../../../entities";
import { Button, AdminPopup } from "../../../../../shared/ui/index.jsx";
import { AdderIcon } from "../../../../../shared/assets/svg";
import { useSelectedSubjects } from "../../model/useSelectedSubjects.js";
import adminPopupItems from "../../../../../shared/const/adminPopupItems";

import { useDownload } from "../../../../../shared/model/index.js";

export default function Subjects(props) {
  const navigate = useNavigate();
  const selectedSubjects = useSelectedSubjects(props.toggle);
  const {handleDownload, isWindowss} = useDownload();
  return (
    <div className="style-subjects">
      <AdminPopup
        adminPopup={adminPopupItems}
        showPopup={props.menuState.showMenu}
        popupPosition={props.menuState.menuPosition}
        topTo="/edit-subject"
      />
      {selectedSubjects.map((item) => (
        <Subject key={item.id} subject={item} menuState={props.menuState} />
      ))}

      <Button
        className="gray-button button-subject"
        leftIcon={<AdderIcon />}
        onClick={() => navigate(`/add-subject`)}
      >
        Добавити предмет
      </Button>
    </div>
  );
}
