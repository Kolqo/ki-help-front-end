import { TimeFormatter } from "../../../shared/ui";

const UserItems = (item) => {
  return [
    {
      id: 1,
      propertyName: "Telegram ID",
      rightComponent: item.telegramId,
    },
    {
      id: 2,
      propertyName: "Ім’я користувача",
      rightComponent: item.username != "" ? item.username : "Unknown",
    },
    {
      id: 3,
      propertyName: "Номер курсу",
      rightComponent: item.courseNumber,
    },
    {
      id: 4,
      propertyName: "Створено",
      rightComponent: <TimeFormatter utcDateString={item.createdAt}/>,
    },
  ];
};

export default UserItems;
