import './styles.css'

import { Button, ErrorMessage, Loading } from '../../../shared/ui'
import Fields from './ui/fields'

import { useGoBack } from '../../../shared/hooks'
import useClickWithdraw from './model/useClickWithdraw.js'

import fieldsForWithdraw from './const/fieldsForWithdraw.js'

export default function Withdraw() {
	useGoBack(`/wallet`)

	const {
		error,
		errorMessage,
		isLoading,
		handleFieldChange,
		handleValidation,
	} = useClickWithdraw(fieldsForWithdraw)

	return (
		<>
			<div className='container-withdraw'>
				<ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
				<Fields onChange={handleFieldChange} fields={fieldsForWithdraw} />
				<Button
					className='blue-button fixed-button'
					onClick={handleValidation}
					disabled={isLoading}
					leftIcon={isLoading && <Loading className='buying-task-spinner' />}
				>
					{isLoading ? 'Виконуєця операція' : 'Зняти'}
				</Button>
			</div>
		</>
	)
}
