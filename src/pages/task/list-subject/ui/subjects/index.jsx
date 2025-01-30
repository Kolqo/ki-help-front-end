import React from "react";
import "./styles.css";
import { Subject } from "../../../../../entities";
import { Button } from "../../../../../shared/ui/index.jsx";
import { GrayAdderIcon } from "../../../../../shared/assets/svg";
import { useSelectedSubjects } from "../../model/useSelectedSubjects.js";

export default function Subjects(props) {
  const selectedSubjects = useSelectedSubjects(props.toggle);

  return (
    <div className="style-subjects">
      {selectedSubjects.map((item) => (
        <Subject key={item.id} subject={item}/>
      ))}
      
      {true &&       
        <Button 
          className="gray-button button-subject" 
          leftIcon={<GrayAdderIcon />}
        >
          Добавити предмет
        </Button>
      }
    </div>
  );
}