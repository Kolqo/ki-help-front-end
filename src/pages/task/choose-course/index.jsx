import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { Checkbox } from "../../../shared/ui";
import { Course, TextHeader } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";

import {
  useObjState,
  useChangeObjState,
} from "../../../entities/checkbox-list/model";
import useSubmitUserCourse from "./model/useSubmitUserCourse";

import getCourses from "../../../entities/checkbox-list/const/getCourses";

export default function ChooseCourse(props) {
  const [isReadRoles, setIsReadRoles] = useState(false);
  const { checkedState, setCheckedState } = useObjState(getCourses);
  const handleCheckboxChangeState = useChangeObjState(setCheckedState);
  const { error, errorMessage, handleSubmitUserCourse } = useSubmitUserCourse();

  return (
    <>
      <div className="container-choose-course">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="content-choose-course">
          <TextHeader />
          <Course
            isChecked={checkedState}
            setIsChecked={handleCheckboxChangeState}
          />
          <div className="rule-checkbox">
            <Checkbox setIsChecked={setIsReadRoles} isChecked={isReadRoles} />
            <p>
              Погодитись з{" "}
              <Link to="/rules" className="no-underline">правилами використання</Link>
            </p>
          </div>
        </div>
        {isReadRoles && (
          <Button
            className="blue-button fixed-button"
            onClick={() =>
              handleSubmitUserCourse(
                checkedState,
                getCourses,
                props.setUserCourse
              )
            }
          >
            Готово
          </Button>
        )}
      </div>
    </>
  );
}
