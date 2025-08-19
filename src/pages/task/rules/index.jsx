import './styles.css'

import { RulesList } from './ui'

import { useGoBack } from '../../../shared/hooks'

export default function Rules(props) {
	useGoBack(props.isFirstOpen ? `/` : `/settings`)

	return (
		<div className='container-rules'>
			<RulesList />
		</div>
	)
}
