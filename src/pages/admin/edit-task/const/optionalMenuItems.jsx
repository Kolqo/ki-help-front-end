import { ProfileIcon, DiscountIcon, VisibleIcon} from "../assets";
import { ArrowGrayIcon } from "../../../../shared/assets/svg";
import { StatusSwitch } from "../../../../shared/ui";

const fieldsForEditTask = [
  {
    id: 1,
    leftIcon: <ProfileIcon/>,
    text: "Розробник",
    rightComponent: <ArrowGrayIcon/>,
    to: "/edit-task/choose-developer",
  },
  {
    id: 2,
    leftIcon: <DiscountIcon/>,
    text: "Знижка",
    rightComponent: <ArrowGrayIcon/>,
    to: "/edit-task/give-discount",
  },
  {
    id: 3,
    leftIcon: <VisibleIcon/>,
    text: "Включити",
    rightComponent: <StatusSwitch/>,
    to: null,
  },
];

export default fieldsForEditTask;