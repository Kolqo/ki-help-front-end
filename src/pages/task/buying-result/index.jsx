import './styles.css'

import {
	Tgs,
	FixedButton,
	Table,
	SectionWrapper,
	Avatar,
	UsernameWrapper,
	CategoriesWrapper,
	ButtonTemplate,
} from '../../../shared/ui'

import { DownloadIcon, ExplanationIcon, Congratulations } from './assets'

import { useDownload, useGoBack } from '../../../shared/hooks'
import { useNavigate } from 'react-router-dom'

export default function BuyingResult() {
	useGoBack(`/`)

	const processTask = JSON.parse(localStorage.getItem('processTask'))

	const tableData = {
		Назва: processTask.task.title,
		Предмет: processTask.task.teacher.subject.name,
		Викладач: processTask.task.teacher.name,
		Розробник: (
			<div className='user-avatar'>
				<Avatar photo={processTask.task.developer.photo} diameter={20} />
				<UsernameWrapper>{processTask.task.developer.username}</UsernameWrapper>
			</div>
		),
	}

	const navigate = useNavigate()

	const { handleDownload } = useDownload()

	return (
		<>
			<div className='container-buying-result'>
				<Tgs src={Congratulations} isLoop isAutoplay />
				<SectionWrapper
					section={{
						footer:
							processTask.status === 'IN_PROGRESS' &&
							'Протягом 1 години  розробник відпише вам, щоб уточнити деталі для подальшої розробки завдання відносно вашого запиту.',
					}}
				>
					<Table data={tableData} />
				</SectionWrapper>
				{processTask.status === 'COMPLETED' && (
					<CategoriesWrapper>
						<ButtonTemplate
							leftData={<DownloadIcon />}
							centerData={{ header: 'Скачати' }}
							onClick={() =>
								handleDownload(processTask.link, processTask.fileName)
							}
						/>
						<ButtonTemplate
							leftData={<ExplanationIcon />}
							centerData={{
								header: 'Пояснення',
								footer:
									'Відкрити чат в реальному часі з ботом, в якому ви можете задати питання відносно завдання',
							}}
						/>
					</CategoriesWrapper>
				)}
				<FixedButton
					text={{ default: 'Продовжити', loading: 'Виконується запит' }}
					isActive={true}
					onClick={() => navigate('/')}
				/>
			</div>
		</>
	)
}
