import React from "react";
import AnimatedSticker from "../../../shared/assets/tgs/AnimatedSticker.tgs";
import "./styles.css";
import { Tgs } from "../../../shared/ui";

export default function NewsItem(props) {
  return (
    <>
      <div className="class-news-item">
        <div className="news-info">
          <p>{props.newsName}</p>
          <span>{props.newsText}</span>
          <link></link>
        </div>
        <Tgs src={AnimatedSticker} isLoop isAutoplay></Tgs>
      </div>
    </>
  );
}