import './styles.css'

import { Tgs } from '../../../../shared/ui'

export default function EmptyList(props) {
	return (
		<>
			<div className='empty-list'>
				<Tgs src={props.icon} isLoop isAutoplay></Tgs>
				<p>{props.text.header}</p>
				<div>{props.text.footer}</div>
			</div>
		</>
	)
}
