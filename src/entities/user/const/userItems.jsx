import { TimeFormatter, UsernameWrapper } from "../../../shared/ui";

const UserItems = (item) => {
  return [
    {
      propertyName: "Telegram ID",
      rightComponent: item?.telegramId,
    },
    {
      propertyName: "Ім’я користувача",
      rightComponent: item?.username != "" ? <UsernameWrapper>{item?.username}</UsernameWrapper> : "Unknown",
    },
    {
      propertyName: "Номер курсу",
      rightComponent: item?.courseNumber,
    },
    {
      propertyName: "Створено",
      rightComponent: <TimeFormatter utcDateString={item?.createdAt}/>,
    },
  ];
};

export default UserItems;
