import './styles.css'

import { UserIcon } from '../../assets'

export default function UserListItem(props) {
	return (
		<>
			<div className='style-user-list-item' onClick={props.onClick}>
				<UserIcon />
				{props.user.username ? props.user.username : 'Unknown'}
			</div>
		</>
	)
}
