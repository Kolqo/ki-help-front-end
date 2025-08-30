import "./styles.css";

import { CategoriesWrapper, FileItem } from "../../../../../shared/ui";

export default function GroupFiles(props) {
  return (
		<>
			<div className='style-group-files'>
				{props.files.map((file, index) => (
					<CategoriesWrapper key={index}>
						<FileItem
							centerData={{ header: file.name }}
							onClick={() =>
								props.setNotification(prevFiles => ({
									...prevFiles,
									files: prevFiles.files.filter((_, i) => i !== index),
								}))
							}
							isCrossVisible
						/>
					</CategoriesWrapper>
				))}
			</div>
		</>
	)
}
