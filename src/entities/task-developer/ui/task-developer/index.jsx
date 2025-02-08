import React, { useState } from "react";
import "./styles.css";

import { CheckIcon } from "../../assets";
import { PropertyItem, Button, Adder } from "../../../../shared/ui/index";
import taskDeveloperItems from "../../const/taskDeveloperItems.jsx";

export default function TaskDeveloper(props) {
  const [fileValue, setFileValue] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);

  const isFile = fileValue && fileValue.length > 0;
  
  const isArguments = (id) => {
    return id === 6;
  }

  const handleItemClick = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="class-task-developer">
        <div className="task-developer-info">
          {taskDeveloperItems(props.taskDeveloper).map((item) => (
            isArguments(item.id) ? (
              <div key={item.id}>
                <PropertyItem 
                  className={`item ${expandedItems.includes(item.id) ? 'expanded' : ''}`} 
                  propertyItem={item} 
                  onClick={() => handleItemClick(item.id)} 
                />
                {expandedItems.includes(item.id) && item.content.map((arg, index) => (
                  <div key={index} className="item-arg isClick"> 
                    <PropertyItem className="item" propertyItem={{id: index, propertyName: `№${index + 1}`, rightComponent: arg}} />
                  </div>
                ))}
              </div>
            ) : (
              <PropertyItem key={item.id} className="item" propertyItem={item} />
            )
          ))}

          {!isFile ? (
            <label>
              <Adder className="adder-item">Додати файл</Adder>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFileValue(e.target.files)}
                multiple
              />
            </label>
          ) : (
            <PropertyItem
              className="item"
              propertyItem={{
                propertyName: "Файл",
                rightComponent: fileValue[0].name, 
              }}
            />
          )}

        </div>
        <div className="on-action">
          <Button
            leftIcon={<CheckIcon />}
            className="action-button gray-button no-select"
          >
            Відправити
          </Button>
        </div>
      </div>
    </>
  );
}