import React, { useState } from "react";
import "./styles.css";

export default function FileCard(props) {
  const [selected, setSelected] = useState("home");

  const items = [
    { id: "home", label: "Home", icon: props.icon },
    { id: "search", label: "Search", icon: props.icon },
    { id: "add", label: "Add", icon: props.icon },
    { id: "settings", label: "Settings", icon: props.icon }
  ];

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
