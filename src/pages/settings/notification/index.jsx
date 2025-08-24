import "./styles.css";

import { useState } from "react";

import { SpecialInput, GroupFiles } from "./ui";
import {
  ActionPopup,
  ErrorMessage,
  FixedButton,
  OptionRow,
} from "../../../shared/ui";

import { TwoArrowIcon } from "../../../shared/assets/svg";

import { usePostNotification } from "../../../features/user/model";
import {
  useErrorMessage,
  useGoBack,
  useShowPopup,
} from "../../../shared/hooks";
import { generateCoursePopupItems } from "../../../shared/lib";

export default function Notification() {
  useGoBack(`/settings/admin-panel`);

  const [isActive, setIsActive] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    courseNumber: "",
    files: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useErrorMessage();

  const postNotificationState = usePostNotification();
  const showPopupState = useShowPopup();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (notification.files.length >= 3) {
      setIsError(true);
      setErrorMessage("Ви не можете завантажити більше трьох файлів");
      e.target.value = "";
      return;
    }

    if (file.size > 5242880) {
      setIsError(true);
      setErrorMessage("Розмір файлу не може перевищувати 5MB");
      e.target.value = "";
      return;
    }

    setNotification((prevState) => ({
      ...prevState,
      files: [...prevState.files, file],
    }));
    e.target.value = "";
  };

  const handleOnChange = (value) => {
    setNotification((prev) => ({ ...prev, message: value }));
    setIsActive(value != "");
  };

  const handleUpdateNotification = (update) => {
    setNotification((prev) => ({ ...prev, ...update }));
  };

  return (
    <>
      <div className="container-support">
        <ErrorMessage
          errors={[
            { isError: isError, errorMessage: errorMessage },
            postNotificationState.error,
          ]}
        />
        {showPopupState.position && (
          <ActionPopup
            ref={showPopupState.menuRef}
            items={generateCoursePopupItems(handleUpdateNotification)}
            onClick={showPopupState.close}
            position={showPopupState.position}
          />
        )}
        <SpecialInput
          value={notification.message}
          onChange={handleOnChange}
          onSetFiles={handleFileChange}
        />
        <OptionRow
          header="Курс"
          option={notification.courseNumber}
          rightIcon={<TwoArrowIcon />}
          onClick={showPopupState.handleLeftClick}
        />
        <GroupFiles
          files={notification.files}
          setNotification={setNotification}
        />
        <FixedButton
          text={{ default: "Відправити", loading: "Виконується запит" }}
          isDisabled={postNotificationState.isLoading}
          isActive={isActive}
          onClick={() =>
            postNotificationState.handlePost(notification, setNotification)
          }
        />
      </div>
    </>
  );
}
