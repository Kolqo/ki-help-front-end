import './styles.css'

import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useAddFile } from '../../../features/file/model'
import { useGoBack } from '../../../shared/hooks'

import { FileAdder, FileAddItem } from './ui'
import { AdminHeader, ErrorMessage, FixedButton } from '../../../shared/ui'

export default function AddIdentifier() {
	const { subjectID, action } = useParams()
	useGoBack(`/list-task/${subjectID}/task-form/${action}/choose-file`)

	const [file, setFile] = useState(null)
	const fileInputRef = useRef(null)

	const addFileState = useAddFile()

	const handleAdderClick = () => {
		fileInputRef.current.click()
	}

	const handleFileChange = e => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0])
		}
	}

	return (
		<>
			<div className='container-add-file'>
				<ErrorMessage errors={[addFileState.error]} />
				<AdminHeader text={{ header: 'Додати пояснення' }} />
				{!file ? (
					<FileAdder
						ref={fileInputRef}
						onChange={handleFileChange}
						onClick={handleAdderClick}
					/>
				) : (
					<FileAddItem file={file} setFile={setFile}/>
				)}
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addFileState.isLoading}
					isActive={!file ? false : true}
					onClick={() => addFileState.handlePost(file, subjectID, action)}
				/>
			</div>
		</>
	)
}
