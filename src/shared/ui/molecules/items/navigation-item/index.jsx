import './styles.css'

import { useNavigate } from 'react-router-dom'
import { ButtonTemplate } from '../../../'
import { ArrowIcon } from '../../../../assets/svg'

export default function NavigationItem(props) {
	const navigate = useNavigate()

	return (
		<ButtonTemplate
			leftData={props.leftData}
			centerData={props.centerData}
			rightData={<ArrowIcon />}
			onClick={() => navigate(props.url)}
		/>
	)
}
