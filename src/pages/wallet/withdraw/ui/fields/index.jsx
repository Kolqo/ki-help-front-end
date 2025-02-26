import React from "react";
import "./styles.css";

import { GroupInput } from "../../../../../shared/ui";
import fieldsForWithdraw from "../../const/fieldsForWithdraw";

export default function Fields(props) {
  return (
    <>
      <div className="style-withdraw-fields">
        <GroupInput
          fields={fieldsForWithdraw.map((item) => ({
            label: item.label,
            placeholder: item.placeholder,
          }))}
          onChange={props.onChange}
        />
        <p>Комісія становить 5% з кожної транзакції.</p>
      </div>
    </>
  );
}
