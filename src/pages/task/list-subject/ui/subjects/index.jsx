import './styles.css'

import { Subject } from '../../../../../entities'
import { EntityPopup } from "../../../../../features/entity/ui"
import { SubjectLoading } from '../'

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
			{props.selectedSubjectsState.isLoading && <SubjectLoading count={5}/>}
		</div>
	)
}
