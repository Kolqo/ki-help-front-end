import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminPopup, DeletePopup } from '../../../../shared/ui'

export default function EntityPopup(props) {
	const [isDeletePopup, setIsDeletePopup] = useState(false)
	const navigate = useNavigate()

	return (
		<>
			{isDeletePopup && (
				<DeletePopup
					onClickCancel={() => setIsDeletePopup(false)}
					onClickConfirm={() => {
						props.deleteSubject(
							props.showPopupState.item?.id || props.showPopupState.item?.documentId
						),
							setIsDeletePopup(false)
					}}
				/>
			)}
			<AdminPopup
				ref={props.showPopupState.menuRef}
				position={props.showPopupState.position}
				onEdit={() => {
          if(props.editLink && props.localStorageName) {
            navigate(props.editLink),
							localStorage.setItem(
								props.localStorageName,
								JSON.stringify(props.showPopupState.item)
							)
          }
				}}
				onRemove={() => setIsDeletePopup(true)}
			/>
		</>
	)
}
