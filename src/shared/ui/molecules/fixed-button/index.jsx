import './styles.css'
import { Loading, Button } from '../../'

export default function FixedButton(props) {
	return (
		<>
			<div className='style-fixed-button'>
				<Button
					className={`blue-button fixed-button ${!props.isActive ? 'non-active' : ''}`}
					onClick={props.onClick}
					disabled={props.isDisabled || !props.isActive}
					leftIcon={
						props.isDisabled && <Loading className='buying-task-spinner' />
					}
				>
					{props.isDisabled ? props.text.loading : props.text.default}
				</Button>
			</div>
		</>
	)
}
