import ProfileIcon from "../assets/svg/profile-icon"
import { ArrowGrayIcon } from "../../../../shared/assets/svg"

const listAdminOptional = [
  {
    id: 1,
    leftIcon: <ProfileIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Профіль користувачів",
    description: null,
    to: "/settings/admin-panel/profile",
  },
];

export default listAdminOptional