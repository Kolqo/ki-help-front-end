import { InvitationIcon, SettingsIcon, TaskIcon, WalletIcon } from "../assets/svg";

const items = [
  { id: "task", label: "Завдання", icon: <TaskIcon />, url:"/"},
  { id: "wallet", label: "Гаманець", icon: <WalletIcon />, url:"/wallet"},
  { id: "invitation", label: "Запрошення", icon: <InvitationIcon />, url:"/invitation"},
  { id: "settings", label: "Налаштування", icon: <SettingsIcon />, url:"/settings"},
];

export default items