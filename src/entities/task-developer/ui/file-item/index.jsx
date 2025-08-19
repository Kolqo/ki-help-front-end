import { useRef } from 'react'
import './styles.css'

import { PropertyItem, Adder, AdminPopup } from '../../../../shared/ui'
import adminPopupItems from '../../../../shared/const/adminPopupItems.jsx'

export default function FileItem(props) {
	const fileInputRef = useRef(null)

	const handleTopClick = () => {
		fileInputRef.current.click()
	}

	return (
		<>
			{!props.isFile ? (
				<label>
					<Adder className='adder-item'>Додати файл</Adder>
					<input
						type='file'
						style={{ display: 'none' }}
						onChange={props.onChange}
						multiple
					/>
				</label>
			) : (
				<div>
					<AdminPopup
						adminPopup={adminPopupItems}
						showPopup={props.menuState.showMenu}
						popupPosition={props.menuState.menuPosition}
						onClickTop={handleTopClick}
						onClickBottom={props.onChange}
					/>
					<PropertyItem
						className='property-item no-select'
						menuState={props.menuState}
						propertyItem={{
							propertyName: 'Файл',
							rightComponent: props.fileValue[0].name,
						}}
					/>
					<input
						type='file'
						ref={fileInputRef}
						style={{ display: 'none' }}
						onChange={props.onChange}
						multiple
					/>
				</div>
			)}
		</>
	)
}
