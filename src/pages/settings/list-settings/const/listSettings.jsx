import { AdminPanelIcon, DevPanelIcon, HelpIcon, HistoryTaskIcon} from "../assets"
import { ArrowGrayIcon } from "../../../../shared/assets/svg"

const listSettings = [
  {
    id: 1,
    leftIcon: <HistoryTaskIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Історія завдань",
    description: "Переглянути виконані завдання",
    to: "/settings/history-task",
  },
  {
    id: 2,
    leftIcon: <HelpIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Звернутися до підтримки",
    description: null,
    to: "/settings/support",
  },
  {
    id: 3,
    leftIcon: <AdminPanelIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Адмін панель",
    description: null,
    to: "/settings/admin-panel",
  },
  {
    id: 4,
    leftIcon: <DevPanelIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Dev панель",
    description: null,
    to: "/settings/dev-panel",
  },
];

export default listSettings