import { ProfileIcon, DiscountIcon, VisibleIcon} from "../assets";
import { ArrowGrayIcon } from "../../../../shared/assets/svg";
import { StatusSwitch } from "../../../../shared/ui";

const fieldsForEditTask = (subjectId, isSwitch, setIsSwitch) => [
  {
    id: 1,
    leftIcon: <ProfileIcon/>,
    text: "Розробник",
    rightComponent: <ArrowGrayIcon/>,
    to: `/list-task/edit-task/${subjectId}/choose-developer`,
  },
  {
    id: 2,
    leftIcon: <DiscountIcon/>,
    text: "Знижка",
    rightComponent: <ArrowGrayIcon/>,
    to: `/list-task/edit-task/${subjectId}/give-discount`,
  },
  {
    id: 3,
    leftIcon: <VisibleIcon/>,
    text: "Включити",
    rightComponent: <StatusSwitch isSwitch={isSwitch} setIsSwitch={setIsSwitch}/>,
    to: null,
  },
];

export default fieldsForEditTask;