import './styles.css'

import { CrossIcon } from '../../../../assets/svg'

export default function CloseButton(props) {
	return (
		<>
			<button
        className='cross-box'
				onClick={(e) => {
          e.stopPropagation()
          if (props.onClick) props.onClick()
        }}
			>
				<CrossIcon
					diameter={props.diameter}
					background={props.background}
					crossColor={props.crossColor}
				/>
			</button>
		</>
	)
}
