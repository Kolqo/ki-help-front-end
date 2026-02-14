import './styles.css'

import { Subject, LoadingSubject } from '../../../../../entities'
import { EntityPopup } from '../../../../../features/entity/ui'

export default function Subjects(props) {
	return (
		<>
			<EntityPopup
				deleteSubject={props.deleteSubject}
				showPopupState={props.showPopupState}
				editLink={`subject-form/edit`}
				localStorageName={'subjectCurrent'}
			/>
			{props.selectedSubjectsState.selectedSubjects.length != 0 && (
				<div className='style-subjects'>
					{props.selectedSubjectsState.selectedSubjects.map(item => (
						<Subject
							key={item.id}
							subject={item}
							bindTarget={props.showPopupState.bindTarget}
						/>
					))}
				</div>
			)}
			<div>
				<div
					ref={props.selectedSubjectsState.sentinelRef}
					style={{ height: 0 }}
				/>
				{props.selectedSubjectsState.isLoading && <LoadingSubject count={5} />}
			</div>
		</>
	)
}
