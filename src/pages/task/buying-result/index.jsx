import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import { Congratulations } from "./assets";
import { DownloadIcon } from "../../../shared/assets/svg";
import { Tgs, Button } from "../../../shared/ui";
import useToggle from "../../../shared/model/useToggle.js";
import DetailBuying from "./ui/detail-buying";

export default function BuyingResult() {
  const { state, toggle } = useToggle(true);

  const location = useLocation();
  const { task } = location.state || {};

  return (
    <>
      <div className="container-buying-result">
        <div className="buying-result">
          <div className="buying-result-tgs">
            <Tgs src={Congratulations} isLoop isAutoplay />
          </div>
          <DetailBuying task={task} isAutoGive={state} />
        </div>
        {state && (
          <div className="buying-result-button-box">
            <Button
              className="blue-button buying-result-button"
              leftIcon={<DownloadIcon />}
            >
              Завантажити
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
