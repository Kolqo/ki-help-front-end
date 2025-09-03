import './styles.css'

import { CategoriesWrapper, Adder } from '../../'

export default function FixedAdder(props) {
	return (
		<>
			<div className='style-fixed-adder' style={{ bottom: `${props.bottom}px`}}>
				<CategoriesWrapper>
					<Adder
						centerText={props.centerText}
						onClick={props.onClick}
						isVisible={props.isVisible}
					/>
				</CategoriesWrapper>
			</div>
		</>
	)
}
