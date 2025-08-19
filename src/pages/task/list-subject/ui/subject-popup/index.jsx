import './styles.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminPopup, DeletePopup } from '../../../../../shared/ui'

export default function SubjectPopup(props) {
	const [isDeletePopup, setIsDeletePopup] = useState(false)
	const navigate = useNavigate()

	return (
		<>
			{isDeletePopup && (
				<DeletePopup
					onClickCancel={() => setIsDeletePopup(false)}
					onClickConfirm={() => {
						props.deleteSubject(props.showPopupState.item.id),
							setIsDeletePopup(false)
					}}
				/>
			)}
			<AdminPopup
				ref={props.showPopupState.menuRef}
				position={props.showPopupState.position}
				onEdit={() => {
					navigate(`/subject-form/edit`),
						localStorage.setItem(
							'subjectForm',
							JSON.stringify(props.showPopupState.item)
						)
				}}
				onRemove={() => setIsDeletePopup(true)}
			/>
		</>
	)
}
