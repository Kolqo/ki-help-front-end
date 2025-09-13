import { forwardRef } from 'react'
import { Adder, SectionWrapper } from '../../../../../shared/ui'

const FileAdder = forwardRef((props, ref) => {
	return (
		<>
			<input
				type='file'
				ref={ref}
				style={{ display: 'none' }}
				onChange={props.onChange}
			/>
			<SectionWrapper section={{ header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ' }}>
				<Adder
					centerText='Додати файл'
					isVisible={true}
					onClick={props.onClick}
				/>
			</SectionWrapper>
		</>
	)
})
export default FileAdder