import './styles.css'

import { Button } from '../../../../../shared/ui'
import { AdderIcon } from '../../../../../shared/assets/svg'

export default function DevBalance(props) {
	return (
		<>
			<div className='style-dev-balance'>
				<p>Dev баланс</p>
				<div className='dev-balance'>
					<span>₴</span>
					<p>{props.devBalance}</p>
				</div>
				<Button
					className='gray-button dev-balance-button'
					leftIcon={<AdderIcon />}
					onClick={props.onClick}
				>
					Поповнити
				</Button>
			</div>
		</>
	)
}
