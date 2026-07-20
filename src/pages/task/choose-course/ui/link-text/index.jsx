import './styles.css'

import { LinkWrapper } from '../../../../../shared/ui'

export default function LinkText() {
	return (
		<>
			<div className='style-link-text'>
				Погодитись з{' '}
				<LinkWrapper href='https://kihelp.gitbook.io/kihelp-docs'>
					правилами використання
				</LinkWrapper>
			</div>
		</>
	)
}
