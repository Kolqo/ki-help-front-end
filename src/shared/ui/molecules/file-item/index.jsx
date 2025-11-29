import { ListTemplate, CloseButton } from '../../'
import { FileIcon } from '../../../assets/svg'

export default function FileItem(props) {
	return (
		<>
			<ListTemplate
				leftData={<FileIcon />}
				centerData={props.centerData}
        onClick={props.onClick}
				rightData={
					props.isCrossVisible && (
						<CloseButton
							diameter='10'
							background='#999999'
							crossColor='#FFFFFF'
							onClick={props.onCrossClick}
						/>
					)
				}
			/>
		</>
	)
}
