import React from "react";
import "./styles.css";

import { Course, TextHeader } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import { useObjState, useChangeObjState } from "../../../entities/checkbox-list/model"
import useSubmitUserCourse from "./model/useSubmitUserCourse";

import getCourses from "../../../entities/checkbox-list/const/getCourses";

export default function ChooseCourse(props) {
  const { checkedState, setCheckedState } = useObjState(getCourses)
  const handleCheckboxChangeState = useChangeObjState(setCheckedState)
  const {error, handleSubmitUserCourse} = useSubmitUserCourse()

  return (
    <>
      <div className="container-choose-course">
        <ErrorMessage isError={error}>Будь ласка, оберіть лише один курс.</ErrorMessage>
        <div className="contain-choose-course">
          <TextHeader />
          <Course isChecked={checkedState} setIsChecked={handleCheckboxChangeState}/>
        </div>
        <div className="no-underline course-button-box">
          <Button className="blue-button course-button" onClick={() => handleSubmitUserCourse(checkedState, getCourses, props.setUserCourse)}>Готово</Button>
        </div>
      </div>
    </>
  );
}
