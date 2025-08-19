import './styles.css'

import ListAdmin from './ui/list-admin'
import { useGoBack } from '../../../shared/hooks'

export default function AdminPanel() {
	useGoBack(`/settings`)
	return (
		<>
			<div className='container-admin-panel'>
				<ListAdmin />
			</div>
		</>
	)
}
