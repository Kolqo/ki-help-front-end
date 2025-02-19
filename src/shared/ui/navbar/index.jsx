import React from "react";
import "./styles.css";
import NavbarItems from "../../const/navbarItems";
import { Link, useLocation } from "react-router-dom";

export default function FileCard() {
  const location = useLocation();
  
  const getCurrentPath = () => {
    const path = location.pathname;
    const currentItem = NavbarItems.find(item => item.url === path);
    return currentItem ? currentItem.id : "task";
  };

  return (
    <div className="class-navbar">
      {NavbarItems.map((items) => (
        <Link
          to={items.url}
          key={items.id}
          className={`navbar-item no-underline ${
            getCurrentPath() === items.id ? "item-choose" : ""
          }`}
        >
          {items.icon}
          {getCurrentPath() === items.id && <span>{items.label}</span>}
        </Link>
      ))}
    </div>
  );
}