import './styles.css'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import {
	AdminHeader,
	ErrorMessage,
	GroupInput,
	FixedButton,
} from '../../../shared/ui'

import {
	useAddArgument,
	useEditArgument,
} from '../../../features/argument/model'
import { useArgumentData } from '../../../features/argument/hooks'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { argumentFormFields } from './const'

export default function ArgumentForm() {
	const { subjectID, action, argumentAction } = useParams()
	useGoBack(`/list-task/${subjectID}/task-form/${action}/choose-arguments`)

	const inputRefs = useRef([])

	const { handleKeyDown, getAllValues, setAllValues } = useInputGroup(
		inputRefs,
		argumentFormFields.length
	)

	const argumentDataState = useArgumentData(argumentAction, setAllValues)
	const addArgumentState = useAddArgument()
	const editArgumentState = useEditArgument()

	return (
		<>
			<div className='container-add-subject'>
				<ErrorMessage
					errors={[addArgumentState.error, editArgumentState.error]}
				></ErrorMessage>
				<AdminHeader text={{ header: 'Додати аргумент' }} />
				<GroupInput
					fields={argumentFormFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => argumentDataState.handleOnChange(getAllValues())}
				/>
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addArgumentState.isLoading || editArgumentState.isLoading}
					isActive={argumentDataState.isActive}
					onClick={() => {
						if (argumentAction === 'add')
							addArgumentState.handlePost(
								argumentDataState.data,
								subjectID,
								action
							)
						else editArgumentState.handlePatch(
							argumentDataState.data,
							subjectID,
							action
						)
					}}
				/>
			</div>
		</>
	)
}
