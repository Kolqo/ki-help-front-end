import './styles.css'

import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useGoBack } from '../../../shared/hooks'

import { FileAdder, FileAddItem } from './ui'
import { AdminHeader, ErrorMessage, FixedButton } from '../../../shared/ui'
import { usePutHistoryFile } from '../../../features/task/model'

export default function AddFile() {
	const { taskStatus } = useParams()
	useGoBack(`/settings/dev-panel/history/${taskStatus}`)

	const historyFile = JSON.parse(localStorage.getItem('historyFile'))
  console.log(historyFile)
  const formattedFile = { file: { name: historyFile.fileName, isPrimary: true } }
	const [file, setFile] = useState(formattedFile)
	const fileInputRef = useRef(null)

	const putHistoryFile = usePutHistoryFile()

	const handleAdderClick = () => {
		fileInputRef.current.click()
	}

	const handleFileChange = e => {
		if (e.target.files && e.target.files[0]) {
			setFile(prevState => ({
				...prevState,
				file: e.target.files[0],
			}))
		}
	}

	return (
		<>
			<div className='container-edit-history-file'>
				<ErrorMessage errors={[putHistoryFile.error]} />
				<AdminHeader text={{ header: 'Редагувати завдання' }} />
				{!file.file ? (
					<FileAdder
						ref={fileInputRef}
						onChange={handleFileChange}
						onClick={handleAdderClick}
					/>
				) : (
					<FileAddItem file={file.file} setFile={setFile} />
				)}
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={putHistoryFile.isLoading}
					isActive={file.file && !file.file.isPrimary}
					onClick={() => putHistoryFile.handlePut(file, historyFile.id)}
				/>
			</div>
		</>
	)
}
