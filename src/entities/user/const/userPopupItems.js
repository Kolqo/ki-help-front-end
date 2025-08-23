const userPopupItems = (handlePatch, item, navigate) => [
  {
    text: "Видати бан",
    onClick: () => handlePatch(item),
  },
  {
    text: "Видати роль",
    onClick: () => {
      navigate(`/settings/admin-panel/profile/choose-role`),
        localStorage.setItem("choseUser", JSON.stringify(item));
    },
  },
];

export default userPopupItems;
