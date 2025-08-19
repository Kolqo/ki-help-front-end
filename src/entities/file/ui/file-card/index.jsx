import { TimeFormatter } from '../../../../shared/ui'
import './styles.css'

export default function FileCard(props) {
	return (
		<>
			<div
				className={`style-file-card no-select ${
					props.item.documentId === props.file?.documentId && `chose-file`
				}`}
				onClick={() => (
					props.setFile(props.item), props.bottomSheetState.openSheet()
				)}
				{...props.bindTarget(props.item)}
			>
				<div className='file-card-header'>
					<p className='text-header'>{props.item.fileName}</p>
					<p className='text-footer'>{props.item.documentId}</p>
				</div>
				<div className='file-card-footer'>
					{props.item.createdAt ? (
						<TimeFormatter utcDateString={props.item.createdAt} />
					) : (
						'Дати не визначено'
					)}
				</div>
			</div>
		</>
	)
}
