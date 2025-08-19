import "./styles.css";

import { ErrorMessage } from "../../../shared/ui";

import { useGoBack } from '../../../shared/hooks'

import { useBankJar } from "../../wallet/deposit/model/useBankJar";

export default function Deposit() {
  useGoBack(`/wallet`);

  const {error, errorMessage, handleChooseJar} = useBankJar();

  return (
    <>
      <div className="container-deposit">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>

      </div>
    </>
  );
}
