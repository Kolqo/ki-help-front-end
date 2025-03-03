import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import {
  AdminPopup,
  Adder,
  ErrorMessage,
  DeletePopup,
} from "../../../../../shared/ui";
import { CheckBoxList } from "../../../../../entities/index.js";

import adminPopupItems from "../../../../../shared/const/adminPopupItems.jsx";
import useRoles from "../../../../../shared/model/useRoles.js";
import { useDeleteTeacher } from "../../model";

export default function Arguments(props) {
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { isAdmin } = useRoles();
  const { error, errorMessage, isLoading, handleDelete } = useDeleteTeacher();

  const handleClickDelete = (teacherId) => {
    setPopupOpen(true);
    setTeacherId(teacherId);
  };

  const deleteTeacher = async () => {
    try {
      await handleDelete(teacherId);
      setPopupOpen(false);
      props.refetch();
    } catch {}
  };

  const isTeachers = props.listObject.length > 0;

  return (
    <>
      <div className="style-teachers">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        {isPopupOpen && (
          <DeletePopup
            onClickCancel={() => setPopupOpen(false)}
            onClickConfirm={() => deleteTeacher()}
          />
        )}
        {props.listObject.map((arg) => (
          <>
            {props.menuState.selectedId === arg.id && (
              <AdminPopup
                adminPopup={adminPopupItems}
                showPopup={props.menuState.showMenu}
                popupPosition={props.menuState.menuPosition}
                onClickTop={() =>
                  navigate(
                    `/list-task/${props.subjectID}/choose-teacher/edit-teacher`,
                    {
                      state: { teacher: arg },
                    }
                  )
                }
                onClickBottom={() => handleClickDelete(arg.id)}
              />
            )}
            {isTeachers && (
              <CheckBoxList
                key={arg.id}
                className="teacher"
                isChecked={props.isChecked[arg.id]}
                setIsChecked={() => props.setIsChecked(arg.id)}
                item={arg}
                menuState={props.menuState}
              >
                {arg.name}
              </CheckBoxList>
            )}
          </>
        ))}
        {isAdmin() && (
          <Adder
            className="teacher"
            onClick={() =>
              navigate(
                `/list-task/${props.subjectID}/choose-teacher/add-teacher`
              )
            }
            isIcon
          >
            Добавити викладача
          </Adder>
        )}
      </div>
    </>
  );
}
