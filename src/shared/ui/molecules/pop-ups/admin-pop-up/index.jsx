import { forwardRef } from 'react'

import { adminPopupItems } from "../../../../const/"
import { ActionPopup } from "../../../"


const AdminPopup = forwardRef((props, ref) => {
	return (
		<>
			{props.position && (
				<ActionPopup
					ref={ref}
					items={adminPopupItems(props.onEdit, props.onRemove)}
					position={props.position}
					onClick={props.onClick}
				/>
			)}
		</>
	)
})

export default AdminPopup