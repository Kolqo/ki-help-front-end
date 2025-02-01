import React from "react";
import { AdderIcon } from "../../../shared/assets/svg";
import "./styles.css";

export default function NewsItem(props) {
  return (
    <>
      <div className="class-news-item">
        <div className="news-info">
          <p>{props.newsName}</p>
          <span>{props.newsText}</span>
          <link></link>
        </div>
        <AdderIcon/>
      </div>
    </>
  );
}