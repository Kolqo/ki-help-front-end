import "./styles.css";

import { useNavigate } from "react-router-dom";

import { TopIconButton, Avatar } from "../../../../shared/ui";

import { userItems, actionUserItems } from "../../const";

export default function User(props) {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="style-user">
        <Avatar photo={props.item.photo} diameter={40} />
        {userItems(props.item).map((item, index) => (
          <div className="item" key={index}>
            <p>{item.propertyName}</p>
            <p className="right-text">{item.rightComponent}</p>
          </div>
        ))}
        <div className="buttons-box">
          {actionUserItems(props.item, props.handleLeftClick).map((item, index) => (
            <TopIconButton
              className="button gray-button no-select"
              key={index}
              leftIcon={item.icon}
              onClick={item.onClick}
            >
              {item.text}
            </TopIconButton>
          ))}
        </div>
      </div>
    </>
  );
}
