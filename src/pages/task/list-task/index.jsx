// index.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import "./styles.css";

import { Filters, Tasks } from "./ui";
import { useGoBack, useShowPopup } from "../../../shared/model";

export default function ListTask() {
  useGoBack(`/`)
  const { subjectID } = useParams();
  const menuState = useShowPopup();
  const location = useLocation();

  const [selectedFilters, setSelectedFilters] = useState({
    teacher: null,
    creator: null,
    price: null,
  });

  sessionStorage.removeItem('selectedCreator');
  sessionStorage.removeItem('selectedArgs');
  sessionStorage.removeItem('selectedTeacher');
  sessionStorage.removeItem('selectedType');

  useEffect(() => {
    const savedFilters = sessionStorage.getItem('selectedFilters');
    if (savedFilters) {
      setSelectedFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    return () => {
      const isChoosePage = window.location.pathname.includes('/list-task/') && 
                          window.location.pathname.includes('choose');
      
      if (!isChoosePage) {
        sessionStorage.removeItem('selectedFilters');
      }
    };
  }, []);
  
  useEffect(() => {
    if (location.state?.filter && Object.prototype.hasOwnProperty.call(location.state, 'value')) {
      setSelectedFilters(prev => {
        const newState = {
          ...prev,
          [location.state.filter]: location.state.value,
        };
        sessionStorage.setItem('selectedFilters', JSON.stringify(newState));
        return newState;
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="container-list-task">
      <Filters subjectID={subjectID} selectedFilters={selectedFilters} />
      <Tasks subjectID={subjectID} menuState={menuState} selectedFilters={selectedFilters} />
    </div>
  );
}