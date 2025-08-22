import './styles.css'

import { ButtonTemplate, CategoriesWrapper } from '../../'
import { AdderIcon } from '../../../assets/svg'

export default function Adder(props) {
	return (
		<>
			{props.isVisible && (
				<ButtonTemplate
					className='style-adder'
					leftData={<AdderIcon />}
					centerData={{ header: props.centerText }}
					onClick={props.onClick}
				/>
			)}
		</>
	)
}
