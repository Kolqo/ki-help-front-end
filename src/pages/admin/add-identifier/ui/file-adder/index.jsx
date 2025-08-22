import { forwardRef } from 'react'
import { Adder, ButtonTemplate, SectionWrapper } from '../../../../../shared/ui'

const FileAdder = forwardRef((props, ref) => {
	return (
		<>
			<input
				type='file'
				ref={ref}
				style={{ display: 'none' }}
				onChange={props.onChange}
			/>
			<Adder
				centerText='Додати файл'
				isVisible={true}
				onClick={props.onClick}
			/>
		</>
	)
})
export default FileAdder