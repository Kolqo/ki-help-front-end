import React from "react";
import "./styles.css";
import { Button } from "../../../../../shared/ui";

export default function YourLink(props) {

  const handleShare = () => {
    const link = `https://telegram.me/share/url?url=https://t.me/KI_help_bot?start=${window.Telegram.WebApp.initDataUnsafe.user.id}&text=Заходь в KIHelp та получи відповідь на завдання, тест, курсову всього за пару кліків. Ось моє запрошувальне посилання`;
    window.location = link;
  };

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
            <Button className="blue-button button" onClick={() => handleShare()}>Поділитися</Button>
          </div>
        </div>
      </div>
    </>
  );
}
