import React from "react";
import "./styles.css";
import { Button } from "../../../../../shared/ui";

export default function YourLink(props) {
  
  return (
    <>
      <div className="style-your-link">
        <p>Ваше посилання</p>
        <div
          className="link"
          onClick={() => (navigator.clipboard.writeText(props.inviteLink))}
        >
          {props.inviteLink}
        </div>
        <Button className="blue-button your-link-button">
          Поділитися вашим посиланням
        </Button>
      </div>
    </>
  );
}
