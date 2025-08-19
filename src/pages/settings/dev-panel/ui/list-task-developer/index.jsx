import './styles.css'

import { TaskDeveloper } from '../../../../../entities'

export default function ListTaskDeveloper(props) {
	return (
		<>
			<div className='style-list-task-developer'>
				{props.selectedTasksDeveloper.map(item => (
					<TaskDeveloper
						key={item.createdAt}
						taskDeveloper={item}
						refetch={props.refetch}
					/>
				))}
			</div>
		</>
	)
}
