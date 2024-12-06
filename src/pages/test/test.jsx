import "./test.css";
import "../../shared/ui/buttons/index";
import Element from "../../shared/ui/checkbox/index.jsx";
import Icon from "../../shared/assets/placeholder";
import useCheckBoxState from "../../shared/modal/useCheckBoxState.jsx"

export default function Test() {
  const { isChecked, toggleCheckboxState } = useCheckBoxState();

  return (
    <>
      <div className="container">
        <Element isChecked={isChecked} setIsChecked={toggleCheckboxState}></Element>
      </div>
    </>
  );
}
