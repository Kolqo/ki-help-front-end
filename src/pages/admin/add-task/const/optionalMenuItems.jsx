import { ProfileIcon, ArgumentsIcon, TypeIcon, AiIcon} from "../assets";
import { ArrowGrayIcon } from "../../../../shared/assets/svg";
import { StatusSwitch } from "../../../../shared/ui";

const fieldsForEditTask = (subjectID, isSwitch, setIsSwitch) => [
  {
    id: 1,
    leftIcon: <ProfileIcon />,
    text: "Розробник",
    rightComponent: <ArrowGrayIcon />,
    to: `/list-task/add-task/${subjectID}/choose-developer`,
  },
  {
    id: 2,
    leftIcon: <ArgumentsIcon />,
    text: "Аргументи",
    rightComponent: <ArrowGrayIcon />,
    to: `/list-task/add-task/${subjectID}/choose-argument`,
  },
  {
    id: 3,
    leftIcon: <TypeIcon />,
    text: "Тип",
    rightComponent: <ArrowGrayIcon />,
    to: `/list-task/add-task/${subjectID}/choose-type`,
  },
  {
    id: 4,
    leftIcon: <AiIcon />,
    text: "Авто генерація",
    rightComponent: <StatusSwitch isSwitch={isSwitch} setIsSwitch={setIsSwitch} />,
    to: null,
  },
];

export default fieldsForEditTask;