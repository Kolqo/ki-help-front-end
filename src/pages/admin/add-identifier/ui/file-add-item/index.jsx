import { FileItem } from '../../../../../shared/ui'

export default function FileAddItem(props) {
	return (
		<>
			<FileItem
				centerData={{
					header:
						props.file.name.length > 30
							? props.file.name.slice(0, 20) + '...'
							: props.file.name,
				}}
				onClick={() => {
					props.setIdentifier(prevState => ({ ...prevState, file: null }))
				}}
				isCrossVisible
			/>
		</>
	)
}
