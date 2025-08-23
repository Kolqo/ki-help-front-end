import { useNavigate } from "react-router-dom";

import { HistoryTaskIcon, MoreIcon, WalletIcon } from "../assets";

const UserItems = (item, handleLeftClick) => {
  const navigate = useNavigate()

  return [
    {
      text: "Гаманець",
      icon: <WalletIcon />,
      onClick: () => navigate(`/settings/admin-panel/profile/wallet/${item.telegramId}`)
    },
    {
      text: "Історія завдань",
      icon: <HistoryTaskIcon />,
      onClick: () => navigate(`/settings/admin-panel/profile/history/${item.telegramId}`)
    },
    {
      text: "Більше",
      icon: <MoreIcon />,
      onClick: (e) => handleLeftClick(e, item)
    },
  ];
};

export default UserItems;
