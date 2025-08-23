import "./styles.css";

import { useNavigate } from "react-router-dom";

import { ChoiceItemList } from "../../../entities";

import { ErrorMessage, FixedButton } from "../../../shared/ui";

import { usePatchRole } from "../../../features/user/model";
import { useCheckboxState } from "../../../entities/choice-item/model";
import { useGoBack } from "../../../shared/hooks";

import { getRoles } from "./const";

export default function ChooseRole() {
  const navigate = useNavigate();

  useGoBack(`/settings/admin-panel/profile`);

  const patchRoleState = usePatchRole();
  const checkboxState = useCheckboxState(getRoles, null, true);
  const user = JSON.parse(localStorage.getItem("choseUser"));
  console.log(user);
  const isActive = Object.values(checkboxState.checkedState).includes(true);

  const selectedRole = Object.keys(checkboxState.checkedState)
    .filter((id) => checkboxState.checkedState[id])
    .map((id) => checkboxState.itemsMap[id]);

  return (
    <>
      <div className="container-choose-role">
        <ErrorMessage errors={[patchRoleState.error]} />
        <ChoiceItemList
          section={{ header: "РОЛІ" }}
          isChecked={checkboxState.checkedState}
          setIsChecked={checkboxState.changeCheckedState}
          objectList={getRoles}
          displayMode="default"
        />
        <FixedButton
          text={{ default: "Підтвердити", loading: "Виконується запит" }}
          isDisabled={patchRoleState.isLoading}
          isActive={isActive}
          onClick={() =>
            patchRoleState.handlePatch(user.telegramId, selectedRole[0])
          }
        />
      </div>
    </>
  );
}
