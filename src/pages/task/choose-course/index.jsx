import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { Course, TextHeader } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useErrorMessage } from "../../../shared/model";
import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model"
import useSubmitUserCourse from "./model/useSubmitUserCourse";

import getCourses from "../../../entities/checkbox-list/const/getCourses";

export default function ChooseCourse() {
  const { error, setError } = useErrorMessage();

  const { checkedState, setCheckedState } = useObjState(getCourses)
  const handleCheckboxChangeState = useChangeObjState(setCheckedState)
  const handleSubmitUserCourse = useSubmitUserCourse(checkedState, setError)

  return (
    <>
      <div className="container-choose-course">
        <ErrorMessage isError={error}>Будь ласка, оберіть лише одного викладача.</ErrorMessage>
        <div className="contain-choose-course">
          <TextHeader />
          <Course isChecked={checkedState} setIsChecked={handleCheckboxChangeState}/>
        </div>
        <div className="no-underline course-button-box">
          <Button className="blue-button course-button" onClick={() => handleSubmitUserCourse(checkedState, setError)}>Готово</Button>
        </div>
      </div>
    </>
  );
}
