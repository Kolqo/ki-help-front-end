import './styles.css'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	AdminHeader,
	CategoriesWrapper,
	ErrorMessage,
	FixedButton,
	GroupInput,
	ListTemplate,
	SectionWrapper,
	StatusSwitch,
} from '../../../shared/ui'
import { Loading } from '../../task'

import { useGoBack, useInputGroup } from '../../../shared/hooks'
import {
	useGetMaintenanceStatus,
	usePatchMaintenanceStatus,
} from '../../../features/maintenance/model'

import { techWorkFields } from './const'

export default function TechWork() {
	useGoBack('/settings/admin-panel')
	const navigate = useNavigate()

	const getMaintenanceState = useGetMaintenanceStatus()
	const patchMaintenanceState = usePatchMaintenanceStatus()

	const [isSwitch, setIsSwitch] = useState(false)
	const [message, setMessage] = useState('')
	const [isReady, setIsReady] = useState(false)

	const inputRefs = useRef([])
	const { handleKeyDown, getValue } = useInputGroup(
		inputRefs,
		techWorkFields.length
	)

	useEffect(() => {
		if (getMaintenanceState.isLoading) return

		setIsSwitch(getMaintenanceState.enabled)
		setMessage(getMaintenanceState.message)
		setIsReady(true)
	}, [getMaintenanceState.isLoading])

	const handleOnClick = () => {
		patchMaintenanceState.handlePatch(isSwitch, isSwitch ? message : '', () =>
			navigate('/settings/admin-panel')
		)
	}

	if (!isReady) {
		return <Loading />
	}

	return (
		<>
			<div className='container-tech-work'>
				<ErrorMessage
					errors={[getMaintenanceState.error, patchMaintenanceState.error]}
				/>
				<AdminHeader
					text={{
						header: 'Технічні роботи',
						footer:
							'Увімкніть режим технічних робіт та вкажіть текст, який побачать користувачі',
					}}
				/>
				<SectionWrapper>
					<CategoriesWrapper>
						<ListTemplate
							centerData={{ header: 'Технічні роботи' }}
							rightData={
								<StatusSwitch
									isSwitch={isSwitch}
									setIsSwitch={() => setIsSwitch(prev => !prev)}
								/>
							}
						/>
					</CategoriesWrapper>
				</SectionWrapper>
				{isSwitch && (
					<GroupInput
						fields={techWorkFields.map(field => ({ ...field, value: message }))}
						inputRefs={inputRefs}
						onKeyDown={handleKeyDown}
						onChange={() => setMessage(getValue(0))}
					/>
				)}
				<FixedButton
					text={{
						default: 'Підтвердити',
						loading: 'Виконується запит',
					}}
					isDisabled={patchMaintenanceState.isLoading}
					isActive={true}
					onClick={handleOnClick}
				/>
			</div>
		</>
	)
}
