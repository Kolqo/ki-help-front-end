import "./styles.css";

import { CategoriesWrapper, FileItem } from "../../../../../shared/ui";
import { FileIcon, CrossIcon } from "../../assets";

export default function GroupFiles(props) {
  return (
		<>
			<div className='style-group-files'>
				{props.files.map((file, index) => (
					<CategoriesWrapper key={index}>
						<FileItem
							centerData={{ header: file.name }}
							onClick={() =>
								props.setFiles(prevFiles =>
									prevFiles.filter((_, i) => i !== index)
								)
							}
							isCrossVisible
						/>
					</CategoriesWrapper>
				))}
			</div>
		</>
	)
}
