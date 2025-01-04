import React from "react";
import Icon from "../../../shared/assets/placeholder"
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
        <Icon/>
      </div>
    </>
  );
}