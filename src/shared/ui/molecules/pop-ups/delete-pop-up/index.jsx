import './styles.css'
import { Button } from '../../../index'

export default function DeletePopup(props) {
	return (
		<>
			<div className='style-popup-delete'>
				<div className='content-popup-delete'>
					<div className='popup-delete-text'>
						<p>Підтвердіть дію</p>
						<span>{props.textInfo}</span>
					</div>
					<div className='popup-buttons'>
						<Button
							className='gray-button popup-button'
							onClick={props.onClickCancel}
						>
							Скасувати
						</Button>
						<Button
							className='blue-button popup-button'
							onClick={props.onClickConfirm}
						>
							Підтвердити
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
