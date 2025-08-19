import ProfileIcon from "../assets/svg/profile-icon"
import { ArrowIcon } from "../../../../shared/assets/svg"

const listAdminOptional = [
	{
		id: 1,
		leftIcon: <ProfileIcon />,
		rightIcon: <ArrowIcon fill='#999999' />,
		name: 'Профіль користувачів',
		description: null,
		to: '/settings/admin-panel/profile',
	},
]

export default listAdminOptional