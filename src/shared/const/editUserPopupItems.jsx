import { EditIcon, BanIcon } from "../assets/svg";

const editUserPopupItems = (isBanned) => ({
  topIcon: <EditIcon />,
  bottomIcon: <BanIcon />,
  topText: "Видати роль",
  bottomText: isBanned ? "Розблокувати" : "Заблокувати",
});

export default editUserPopupItems;
