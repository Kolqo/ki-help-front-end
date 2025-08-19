import { ArrowIcon } from '../../../shared/assets/svg'
import { TimeFormatter } from '../../../shared/ui'

const taskDeveloperItems = item => {
	return [
		{
			id: 1,
			propertyName: "Ім'я",
			rightComponent: item.user.username,
		},
		{
			id: 2,
			propertyName: 'ID',
			rightComponent: item.user.telegramId,
		},
		{
			id: 3,
			propertyName: 'Предмет',
			rightComponent: item.subjectName,
		},
		{
			id: 4,
			propertyName: 'Викладач',
			rightComponent: item.teacherName,
		},
		{
			id: 5,
			propertyName: 'Завдання',
			rightComponent: item.taskTitle,
		},
		{
			id: 6,
			propertyName: 'Аргументи',
			rightComponent: <ArrowIcon fill='#999999' />,
			content: item.arguments,
		},
		{
			id: 7,
			propertyName: 'Створено',
			rightComponent: <TimeFormatter utcDateString={item.createdAt} />,
		},
	]
}

export default taskDeveloperItems
