import { AdminPanelIcon, DevPanelIcon, HelpIcon, HistoryTaskIcon} from "../assets"
import { ArrowGrayIcon } from "../../../../shared/assets/svg"

const listSettings = [
  {
    id: 1,
    leftIcon: <HistoryTaskIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Історія завдань",
    description: "Переглянути виконані завдання",
    to: `/settings/history-task`,
    isForAdmin: false,
    isForDeveloper: false,
  },
  {
    id: 2,
    leftIcon: <HelpIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Звернутися до підтримки",
    description: null,
    to: `/settings/support`,
    isForAdmin: false,
    isForDeveloper: false,
  },
  {
    id: 3,
    leftIcon: <AdminPanelIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Адмін панель",
    description: null,
    to: `/settings/admin-panel`,
    isForAdmin: true,
    isForDeveloper: false,
  },
  {
    id: 4,
    leftIcon: <DevPanelIcon/>,
    rightIcon: <ArrowGrayIcon/>,
    name: "Dev панель",
    description: null,
    to: `/settings/dev-panel`,
    isForAdmin: false,
    isForDeveloper: true,
  },
  {
    id: 5,
    leftIcon: null,
    rightIcon: null,
    name: "Угоди користувача",
    description: null,
    to: `/settings/rules`,
    isForAdmin: false,
    isForDeveloper: false,
  },
];

export default listSettings