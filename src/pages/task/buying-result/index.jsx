import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import { Congratulations } from "./assets";
import { DownloadIcon } from "../../../shared/assets/svg";
import { Tgs, Button, Loading } from "../../../shared/ui";
import DetailBuying from "./ui/detail-buying";

import { useDownload, useGoBack } from "../../../shared/model";

export default function BuyingResult() {
  const location = useLocation();
  const { processTask } = location.state || {};

  useGoBack(`/`);

  const { handleDownload } = useDownload();
  console.log(processTask);

  return (
    <>
      <div className="container-buying-result">
        <div className="buying-result">
          <div className="buying-result-tgs">
            <Tgs src={Congratulations} isLoop isAutoplay />
          </div>
          <DetailBuying
            processTask={processTask}
            isAutoGive={processTask.autoGenerate}
          />
        </div>
        {processTask.autoGenerate && (
          <Button
            className="blue-button fixed-button"
            onClick={() =>
              handleDownload(processTask.link, processTask.fileName)
            }
          >
            Завантажити
          </Button>
        )}
      </div>
    </>
  );
}
