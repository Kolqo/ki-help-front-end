import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { AdminPopup } from "../../../shared/ui";
import SubjectArrow from "../assets/subject-arrow";

import adminPopupItems from "../../../shared/const/adminPopupItems";

export default function Subject(props) {
  const navigate = useNavigate();

  const deleteSubject = async () => {
    try {
      await props.handleDelete(props.subject.id);
      props.refetch();
    } catch {} 
  }

  return (
    <>
      {props.menuState.selectedId === props.subject.id && (
        <AdminPopup
          adminPopup={adminPopupItems}
          showPopup={props.menuState.showMenu}
          popupPosition={props.menuState.menuPosition}
          onClickTop={() => navigate(`/edit-subject`, {
            state: { subject: props.subject },
          })}
          onClickBottom={() => deleteSubject()}
        />
      )}
      <div
        className="class-subject no-select no-focus-and-active"
        onClick={() => navigate(`/list-task/${props.subject.id}`)}
        onContextMenu={(e) =>
          props.menuState?.handleContextMenu(e, props.subject?.id)
        }
        onTouchStart={(e) =>
          props.menuState?.handleTouchStart(e, props.subject?.id)
        }
        onTouchEnd={props.menuState.handleTouchEnd}
        onTouchMove={props.menuState.handleTouchMove}
      >
        {props.subject.name}
        <SubjectArrow />
      </div>
    </>
  );
}
