import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { AdminPopup, Adder, ErrorMessage, DeletePopup } from "../../../../../shared/ui";
import { CheckBoxList } from "../../../../../entities";

import adminPopupItems from "../../../../../shared/const/adminPopupItems.jsx";
import { useDeleteArgument } from "../../model";

export default function Arguments(props) {
  const navigate = useNavigate();

  const [argumentId, setArgumentId] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { errorDelete, errorDeleteMessage, isLoadingMessage, handleDelete } =
    useDeleteArgument();

  const handleClickDelete = (argumentId) => {
    setPopupOpen(true);
    setArgumentId(argumentId);
  };

  const deleteArgument = async () => {
    try {
      await handleDelete(argumentId);
      setPopupOpen(false);
      props.refetch();
    } catch {}
  };

  return (
    <>
      <div className="style-arguments">
        <ErrorMessage isError={errorDelete}>{errorDeleteMessage}</ErrorMessage>
        {isPopupOpen && (
          <DeletePopup
            onClickCancel={() => setPopupOpen(false)}
            onClickConfirm={() => deleteArgument()}
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
                    `/list-task/add-task/${props.subjectID}/choose-argument/edit-argument`,
                    {
                      state: { argument: arg },
                    }
                  )
                }
                onClickBottom={() => handleClickDelete(arg.id)}
              />
            )}
            <CheckBoxList
              key={arg.id}
              className="argument"
              isChecked={props.isChecked[arg.id]}
              setIsChecked={() => props.setIsChecked(arg.id)}
              menuState={props.menuState}
              item={arg}
            >
              {arg.name}
            </CheckBoxList>
          </>
        ))}
        <Adder
          className="argument"
          onClick={() =>
            navigate(
              `/list-task/add-task/${props.subjectID}/choose-argument/add-argument`
            )
          }
          isIcon
        >
          Добавити аргумент
        </Adder>
      </div>
    </>
  );
}
