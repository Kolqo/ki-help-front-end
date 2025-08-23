import { useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
  BottomSheet,
  BottomSheetHeader,
  FixedButton,
  Table,
  UsernameWrapper,
} from "../../../../../shared/ui";

export default function BottomSheetHistory(props) {
  const navigate = useNavigate();

  // const typeMap = {
  //   DEPOSIT: {
  //     leftData: leftData,
  //     style: "deposit",
  //     data: {
  //       header: props.item.source.user.username,
  //       footer: props.isDevMode ? "Купівля завдання" : "Поповнення гаманця",
  //     },
  //     amount: `+${props.item.amount}`,
  //   },
  //   WITHDRAW: {
  //     leftData: leftData,
  //     style: "withdraw",
  //     data: {
  //       header: props.item.source.user.username,
  //       footer: "Купівля завдання",
  //     },
  //     amount: `-${props.item.amount}`,
  //   },
  //   TRANSFER: {
  //     leftData: <PaymentsIcon />,
  //     style: "transfer",
  //     data: { header: "Переказ", footer: "Виплата коштів" },
  //     amount: `${props.item.amount}`,
  //   },
  // };

  // const txMeta = typeMap[props.item.type] ?? {
  //   leftData: <ProfileIcon />,
  //   style: "",
  //   data: { header: "Невідомо", footer: "Невідомо" },
  // };

  const historyData = {
    Назва: props.history?.task.title,
    Предмет: props.history?.task.teacher.subject.name,
    Викладач: props.history?.task.teacher.name,
    Розробник: (
      <div className="user-avatar">
        <Avatar diameter="20" photo={props.history?.task.developer.photo} />
        <UsernameWrapper>
          {props.history?.task.developer.username}
        </UsernameWrapper>
      </div>
    ),
    Аргументи: props.history?.arguments,
  };

  return (
    <>
      <BottomSheet bottomSheetState={props.bottomSheetState}>
        <BottomSheetHeader
          text={{
            header: "Інформація про завдання",
            footer: "Дізнатися більше інформаці про завдання",
          }}
        />
        <Table data={historyData} />
        <FixedButton
          text={{ default: "Відкрити чат", loading: "Виконується запит" }}
          isActive={true}
        />
      </BottomSheet>
    </>
  );
}
