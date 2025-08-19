import { useState, useEffect } from "react";
import "./styles.css";

import { SpecialInput, GroupFiles, ListFaq } from "./ui";
import { Button, ErrorMessage, Loading } from "../../../shared/ui";

import { useFileLoad, useSendMessage } from "./model";
import { useGoBack } from '../../../shared/hooks'

export default function Support() {
  useGoBack(`/settings`);

  const [message, setMessage] = useState("");
  const { error, errorMassage, fileValue, handleFileChange, handleFileRemove } =
    useFileLoad();
  const { errorSending, errorSendingMassage, isLoading, handleSentMessage } =
    useSendMessage();

  return (
    <>
      <div className="container-support">
        <ErrorMessage isError={error || errorSending}>
          {error ? errorMassage : errorSendingMassage}
        </ErrorMessage>
        <div className="support-content">
          <SpecialInput
            value={message}
            onChange={setMessage}
            onFileChange={handleFileChange}
          />
          <GroupFiles files={fileValue} onDelete={handleFileRemove} />
          <ListFaq />
        </div>

        <Button
          className="blue-button fixed-button"
          onClick={() => handleSentMessage(message, fileValue)}
          disabled={isLoading}
          leftIcon={isLoading && <Loading className="buying-task-spinner" />}
        >
          {isLoading ? "Відпраляється" : "Надіслати"}
        </Button>
      </div>
    </>
  );
}
