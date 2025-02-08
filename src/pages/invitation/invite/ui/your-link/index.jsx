import React from "react";
import "./styles.css";
import { Button } from "../../../../../shared/ui";

export default function YourLink(props) {
  return (
    <>
      <div className="style-your-link">
        <p>ЗАПОШУВАЛЬНЕ ПОСИЛАННЯ</p>
        <div className="content">
          <div
            className="link"
            onClick={() => navigator.clipboard.writeText(props.inviteLink)}
          >
            {props.inviteLink}
          </div>
          <div className="your-link-buttons">
            <Button
              className="blue-button button"
              onClick={() => navigator.clipboard.writeText(props.inviteLink)}
            >
              Копіювати
            </Button>
            <Button className="blue-button button">Поділитися</Button>
          </div>
        </div>
      </div>
    </>
  );
}
