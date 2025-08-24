import './styles.css'

import { useState } from 'react'

import { SpecialInput, GroupFiles, ListFaq } from './ui'
import { ErrorMessage, FixedButton } from '../../../shared/ui'

import { useSendNotificationSupport } from '../../../features/user/model'
import { useErrorMessage, useGoBack } from '../../../shared/hooks'

export default function Support() {
	useGoBack(`/settings`)

	const [isActive, setIsActive] = useState(false)
	const [support, setSupport] = useState({ message: '', files: [] })
	const [errorMessage, setErrorMassage] = useState('')
	const [isError, setIsError] = useErrorMessage()

  const sendNotificationSupportState = useSendNotificationSupport()

	const handleFileChange = e => {
		const file = e.target.files[0]
		if (!file) return

		if (support.files.length >= 3) {
			setIsError(true)
			setErrorMassage('Ви не можете завантажити більше трьох файлів')
			e.target.value = ''
			return
		}

		if (file.size > 5242880) {
			setIsError(true)
			setErrorMassage('Розмір файлу не може перевищувати 5MB')
			e.target.value = ''
			return
		}

		setSupport(prevState => ({...prevState, files: [...prevState.files, file]}))
		e.target.value = ''
	}

	const handleOnChange = value => {
		setSupport(prevState => ({ ...prevState, message: value }))
		setIsActive(value != '')
	}

  useState(() => {
		console.log(sendNotificationSupportState.isLoading)
	}, [sendNotificationSupportState.isLoading])

	return (
		<>
			<div className='container-support'>
				<ErrorMessage
					errors={[
						{ isError: isError, errorMessage: errorMessage },
						sendNotificationSupportState.error,
					]}
				/>
				<SpecialInput
					value={support.message}
					onChange={handleOnChange}
					onSetFiles={handleFileChange}
				/>
				<GroupFiles files={support.files} setSupport={setSupport} />
				<ListFaq />
				<FixedButton
					text={{ default: 'Відправити', loading: 'Виконується запит' }}
					isDisabled={sendNotificationSupportState.isLoading}
					isActive={isActive}
					onClick={() =>
						sendNotificationSupportState.handlePost(support, setSupport)
					}
				/>
			</div>
		</>
	)
}
