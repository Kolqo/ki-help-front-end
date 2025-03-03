import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import {
  ActionSwitch,
  Button,
  ErrorMessage,
  Loading,
  RangeSlider,
} from "../../../shared/ui";

import { useGoBack, useRangeSlider, useToggle } from "../../../shared/model";
import usePostDiscount from "./model/usePostDiscount";

export default function GiveDiscount() {
  const navigate = useNavigate();
  const { subjectID } = useParams();
  useGoBack(`/list-task/edit-task/${subjectID}`);
  const location = useLocation();
  const { task } = location.state || {};
  console.log(task);
  const { state, toggle } = useToggle();

  const [selectedUser, setSelectedUser] = useState({ user: null, amount: 0, task: null});
  
  const {
    value,
    setValue,
    sliderRef,
    handleMouseOrTouchDown,
    handleClickOnLine,
    percentage,
    max,
  } = useRangeSlider(100, 1);

  const { error, errorMessage, isLoading, handlePost } = usePostDiscount();

  if (task) { sessionStorage.setItem("selectedTask", JSON.stringify(task)); }
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem("selectedUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSelectedUser((prev) => ({ ...prev, user: user }));
    }

    const storedAmount = sessionStorage.getItem("selectedAmount");
    if (storedAmount) {
      const amount = JSON.parse(storedAmount);
      setSelectedUser((prev) => ({ ...prev, amount: amount }));
    }

    const storedTask = sessionStorage.getItem("selectedTask");
    if (storedTask) {
      const task = JSON.parse(storedTask);
      setSelectedUser((prev) => ({ ...prev, task: task }));
    }
  }, []);
  
  return (
    <>
      <div className="container-give-discount">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content">
          <ActionSwitch
            isSwitch={state}
            setIsSwitch={toggle}
            leftText="Глобальна"
            rightText="Локальна"
          />
          <div className="value-box">
            <p>{`${value}%`}</p>
          </div>
        </div>
        <div className="action">
          <RangeSlider
            value={value}
            max={max}
            percentage={percentage}
            sliderRef={sliderRef}
            handleClickOnLine={handleClickOnLine}
            handleMouseOrTouchDown={handleMouseOrTouchDown}
            setValue={setValue}
          />
          <Button
            className="blue-button give-discount-button"
            onClick={() =>
              handlePost(
                state,
                value,
                state ? null : selectedUser.amount,
                state ? null : selectedUser.user.telegramId,
                selectedUser.task.id
              )
            }
            disabled={isLoading}
            leftIcon={isLoading && <Loading className="buying-task-spinner" />}
          >
            {isLoading ? "Виконується запит" : "Добавити"}
          </Button>
          {!state && (
            <Button
              className="gray-button give-discount-button"
              onClick={() =>
                navigate(
                  `/list-task/edit-task/${subjectID}/give-discount/choose-user`
                )
              }
            >
              Переглянути користувачів
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
