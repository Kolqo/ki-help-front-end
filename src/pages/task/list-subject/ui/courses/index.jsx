import './styles.css'

import { generateCoursePopupItems } from '../../../../../shared/lib'

export default function Courses(props) {
	return (
		<>
			<div className='style-courses no-select no-focus-and-active'>
				{generateCoursePopupItems().map((items, index) => (
					<div
						key={index}
						className={`course no-underline ${
							props.toggle === items.text ? 'active' : ''
						}`}
						onClick={() => props.setToggle(items.text)}
					>
						<p>Курс №{items.text}</p>
					</div>
				))}
			</div>
		</>
	)
}
