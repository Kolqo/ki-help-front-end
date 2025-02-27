import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { AdminPopup, Adder, ErrorMessage } from "../../../../../shared/ui/index.jsx";
import { CheckBoxList } from "../../../../../entities/index.js";

import adminPopupItems from "../../../../../shared/const/adminPopupItems.jsx";
import useRoles from "../../../../../shared/model/useRoles.js";
import { useDeleteTeacher } from "../../model";

export default function Arguments(props) {
  const navigate = useNavigate();
  const { isAdmin } = useRoles();

  const { error, errorMessage, isLoading, handleDelete } = useDeleteTeacher();

  const deleteTeacher = async (teacherId) => {
    try {
      await handleDelete(teacherId);
      props.refetch();
    } catch {}
  };

  return (
    <>
      <div className="style-teachers">
        <ErrorMessage isError={error}>
          {errorMessage}
        </ErrorMessage>
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
                onClickBottom={() => deleteTeacher(arg.id)}
              />
            )}
            <CheckBoxList
              key={arg.id}
              className="teacher"
              isChecked={props.isChecked[arg.id]}
              setIsChecked={() => props.setIsChecked(arg.id)}
              teacher={arg}
              menuState={props.menuState}
            >
              {arg.name}
            </CheckBoxList>
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
