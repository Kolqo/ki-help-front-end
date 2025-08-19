import { useState } from 'react'
import './styles.css'

import { DeletePopup } from '../../../../../shared/ui'

export default function SubjectRemovePopup(props) {
  const [isDeletePopup, setIsDeletePopup] = useState(false)

	return (
		<>
      {isDeletePopup && (
        <DeletePopup
          onClickCancel={() => setIsDeletePopup(false)}
          onClickConfirm={() => {
            props.deleteSubject(props.showPopupState.itemId), setIsDeletePopup(false)
          }}
        />
      )}
		</>
	)
}
