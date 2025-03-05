import React from "react";
import "./styles.css";

import { Button } from "../../../../shared/ui";

import { useRoles } from "../../../../shared/model";

import { AiIcon, VisibleIcon, InvisibleIcon } from "../../assets";

export default function Task(props) {
  const { isAdmin } = useRoles()

  const isDiscount = props.task.discount > 0;
  const priceWithDiscount =
    props.task.price - props.task.price * (props.task.discount / 100);
  return (
    <div
      className={`class-task ${isDiscount && "task-discount-style"}`}
      onContextMenu={(e) =>
        props.menuState?.handleContextMenu(e, props.task?.id)
      }
      onTouchStart={(e) =>
        props.menuState?.handleTouchStart(e, props.task?.id)
      }
      onTouchEnd={props.menuState.handleTouchEnd}
      onTouchMove={props.menuState.handleTouchMove}
    >
      <div className="task-header">
        <div className="task-info">
          <p>{props.task.title}</p>
          <span>
            Вартість{" "}
            {isDiscount ? (
              <s>{props.task.price}грн</s>
            ) : (
              `${props.task.price}грн`
            )}{" "}
            {isDiscount && `/ ${priceWithDiscount}грн`}
          </span>
        </div>
        <Button
          className="task-button-buy blue-button no-select"
          onClick={props.onClick}
        >
          Придбати
        </Button>
      </div>
      <div className="task-footer">
        <p>Створено: @{props.task.developer.username}</p>
        <div className="footer-icons">
          {isAdmin() && (props.task.visible ? <VisibleIcon/> : <InvisibleIcon/>)}
          {props.task.autoGenerate && <AiIcon />}
        </div>
      </div>
    </div>
  );
}
