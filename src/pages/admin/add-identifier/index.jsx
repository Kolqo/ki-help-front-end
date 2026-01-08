import './styles.css'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { FileAdder, FileAddItem } from './ui'
import {
	AdminHeader,
	CategoriesWrapper,
	ErrorMessage,
	FixedButton,
	GroupInput,
	ListTemplate,
	StatusSwitch,
} from '../../../shared/ui'

import { useAddIdentifier } from '../../../features/identifier/model'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { addIdentifierFields } from './const'

export default function AddIdentifier() {
	const { subjectID, action } = useParams()
	useGoBack(`/list-task/${subjectID}/task-form/${action}/choose-identifier`)
  localStorage.removeItem('chooseIdentifier')

	const [isIdentifier, setIsIdentifier] = useState(false)
	const [identifier, setIdentifier] = useState({name: '', description: '', file: null})

	const fileInputRef = useRef(null)
	const inputRefs = useRef([])

	const addIdentifierState = useAddIdentifier()

	const { handleKeyDown, setValue, getAllValues } = useInputGroup(
		inputRefs,
		addIdentifierFields.length
	)

	const handleAdderClick = () => {
		fileInputRef.current.click()
	}

	const handleFileChange = e => {
		if (e.target.files && e.target.files[0]) {
			setIdentifier(prevState => ({ ...prevState, file: e.target.files[0] }))
		}
	}

	const handleOnChange = value => {
    let newValue
		if (!isIdentifier) {
			newValue = {
				...identifier,
				name: value[0],
				description: value[1],
			}
		} else {
      newValue = {
				...identifier,
        name: '',
				description: value[0],
			}
    }
		setIdentifier(newValue)
	}

  const handleIsActive = newValue => {
		if (isIdentifier) {
			return newValue.description != '' && !!newValue.file
		} else {
			return newValue.name != '' && newValue.description != ''
		}
	}

	return (
		<>
			<div className='container-add-file'>
				<ErrorMessage errors={[addIdentifierState.error]} />
				<AdminHeader text={{ header: 'Додати ідентифікатор' }} />
				<GroupInput
					fields={addIdentifierFields(isIdentifier)}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getAllValues())}
				/>
				<CategoriesWrapper>
					<ListTemplate
						centerData={{ header: 'Ідентифікатор файл' }}
						rightData={
							<StatusSwitch
								setIsSwitch={() => (
									setIsIdentifier(prevState => !prevState),
									setIdentifier(prevState => ({ ...prevState, file: null })),
									setValue(0, ''),
									setIsActive(false)
								)}
							/>
						}
					/>
					{isIdentifier &&
						(!identifier.file ? (
							<FileAdder
								ref={fileInputRef}
								onChange={handleFileChange}
								onClick={handleAdderClick}
							/>
						) : (
							<FileAddItem
								file={identifier.file}
								setIdentifier={setIdentifier}
								onChange={() => handleOnChange(getAllValues())}
							/>
						))}
				</CategoriesWrapper>
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addIdentifierState.isLoading}
					isActive={handleIsActive(identifier)}
					onClick={() =>
						addIdentifierState.handlePost(identifier, subjectID, action)
					}
				/>
			</div>
		</>
	)
}
