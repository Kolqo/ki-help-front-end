import React, { useState } from "react";
import { items } from "../../const/navbarItems";
import "./styles.css";

export default function FileCard() {
  const [selected, setSelected] = useState("home");

  return (
    <div className="class-navbar">
      {items.map((item) => (
        <div
          key={item.id}
          className={`navbar-item ${selected === item.id ? "item-choose" : ""}`}
          onClick={() => setSelected(item.id)}
        >
          {item.icon}
          {selected === item.id && <span>{item.label}</span>}
        </div>
      ))}
    </div>
  );
}
