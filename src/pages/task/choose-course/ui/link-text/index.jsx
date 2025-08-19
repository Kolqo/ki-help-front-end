import './styles.css'

import { Link } from 'react-router-dom'

export default function LinkText() {
	return (
		<>
			<div className='style-link-text'>
				Погодитись з{' '}
				<Link to='/rules' className='no-underline'>
					правилами використання
				</Link>
			</div>
		</>
	)
}
