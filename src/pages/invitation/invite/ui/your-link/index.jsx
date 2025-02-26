import React from "react";
import "./styles.css";
import { Button } from "../../../../../shared/ui";

export default function YourLink(props) {
  const link = `https://telegram.me/share/url?url=https://t.me/KI_help_bot?start=${window.Telegram.WebApp.initDataUnsafe.user.id}&text=Заходь в KIHelp та получи відповідь на завдання, тест, курсову всього за пару кліків. Ось моє запрошувальне посилання`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      window.Telegram.WebApp.showAlert("Посилання успішно скопійовано!");
    } catch (error) {
      window.Telegram.WebApp.showAlert("Не вдалося скопіювати посилання");
      console.error("Помилка копіювання:", error);
    }
  };

  const handleShare = () => {
    window.location = link;
  };

  return (
    <>
      <div className="style-your-link">
        <p>ЗАПРОШУВАЛЬНЕ ПОСИЛАННЯ</p>
        <div className="content">
          <div className="link" onClick={handleCopy}>
            {`https://telegram.me/share/url?url=https://t.me/KI_help_bot?start=${window.Telegram.WebApp.initDataUnsafe.user.id}`}
          </div>
          <div className="your-link-buttons">
            <Button className="blue-button button" onClick={handleCopy}>
              Копіювати
            </Button>
            <Button
              className="blue-button button"
              onClick={() => handleShare()}
            >
              Поділитися
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
