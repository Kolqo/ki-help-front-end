import React from "react";
import "./styles.css";

import { FAQ } from "../../../../../shared/ui";
import { ArrowIcon } from "../../assets";
import faqList from "../../const/faqList";

export default function ListFaq() {
  return (
    <>
      <div className="style-list-faq">
        <p>FAQ</p>
        {faqList.map((item) => (
          <FAQ key={item.id} icon={<ArrowIcon/>} faq={item}/>
        ))}
      </div>
    </>
  );
}