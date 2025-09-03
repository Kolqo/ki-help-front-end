import './styles.css'

import { Subject, LoadingSubject } from '../../../../../entities'
import { EntityPopup } from "../../../../../features/entity/ui"

export default function Subjects(props) {
	return (
		<div className='style-subjects'>
			<EntityPopup
				deleteSubject={props.deleteSubject}
				showPopupState={props.showPopupState}
				editLink={`subject-form/edit`}
				localStorageName={'subjectCurrent'}
			/>
			{props.selectedSubjectsState.selectedSubjects.map(item => (
				<Subject
					key={item.id}
					subject={item}
					bindTarget={props.showPopupState.bindTarget}
				/>
			))}
			<div
				ref={props.selectedSubjectsState.sentinelRef}
				style={{ height: 1 }}
			/>
			{props.selectedSubjectsState.isLoading && <LoadingSubject count={5} />}
		</div>
	)
}
