import React, { useState } from "react";
import "./styles.css";

import NavbarItems from "../../const/navbarItems";
import { Link } from "react-router-dom";

export default function FileCard() {
  const [selected, setSelected] = useState("task");

  return (
    <div className="class-navbar">
      {NavbarItems.map((items) => (
        <Link
          to={items.url}
          key={items.id}
          className={`navbar-item no-underline ${
            selected === items.id ? "item-choose" : ""
          }`}
          onClick={() => setSelected(items.id)}
        >
          {items.icon}
          {selected === items.id && <span>{items.label}</span>}
        </Link>
      ))}
    </div>
  );
}
