import './styles.css'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAddFile } from '../../../features/file/model'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { FileAdder, FileAddItem } from './ui'
import {
	AdminHeader,
	ErrorMessage,
	FixedButton,
	GroupInput,
} from '../../../shared/ui'

import { addFileFields } from './const'

export default function AddFile() {
	const { subjectID, action } = useParams()
	useGoBack(`/list-task/${subjectID}/task-form/${action}/choose-file`)

	const [file, setFile] = useState({ file: null, description: '' })
	const fileInputRef = useRef(null)
	const inputRefs = useRef([])

	const addFileState = useAddFile()

	const { handleKeyDown, getValue } = useInputGroup(
		inputRefs,
		addFileFields.length
	)

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

	const handleOnChange = value => {
		let newValue = {
			...file,
			description: value,
		}
		setFile(newValue)
	}

	return (
		<>
			<div className='container-add-file'>
				<ErrorMessage errors={[addFileState.error]} />
				<AdminHeader text={{ header: 'Додати пояснення' }} />
				<GroupInput
					fields={addFileFields()}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getValue(0))}
				/>
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
					isDisabled={addFileState.isLoading}
					isActive={file.description != '' && file.file}
					onClick={() => addFileState.handlePost(file, subjectID, action)}
				/>
			</div>
		</>
	)
}
