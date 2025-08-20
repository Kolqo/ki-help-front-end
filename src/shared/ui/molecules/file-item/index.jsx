import { ListTemplate, CloseButton } from '../../'
import { ExplanationFileIcon } from '../../../assets/svg'

export default function FileItem(props) {
	return (
		<>
			<ListTemplate
				leftData={<ExplanationFileIcon />}
				centerData={props.centerData}
				rightData={
					props.isCrossVisible && (
						<CloseButton
							diameter='10'
							background='#999999'
							crossColor='#FFFFFF'
							onClick={props.onClick}
						/>
					)
				}
			/>
		</>
	)
}
