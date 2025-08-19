import { useNavigate } from 'react-router-dom'
import './styles.css'

import SubjectArrow from '../assets/subject-arrow'

export default function Subject(props) {
	const navigate = useNavigate()

	return (
		<>
			<div
				className='class-subject no-select no-focus-and-active'
				onClick={() => navigate(`/list-task/${props.subject.id}`)}
				{...props.bindTarget(props.subject)}
			>
				{props.subject?.name}
				<SubjectArrow />
			</div>
		</>
	)
}
