import { OptionRow } from '../../../../../shared/ui'
import { ArrowIcon } from '../../../../../shared/assets/svg'

export default function Filter(props) {
	return (
		<>
			<OptionRow
				header='Викладач'
				option={props.option}
				rightIcon={<ArrowIcon fill='#999999' />}
				onClick={props.onClick}
			/>
		</>
	)
}
