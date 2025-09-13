import React from "react";
import "./styles.css";

import { AdminHeader, Button, ErrorMessage, Loading } from "../../../shared/ui";
import Fields from "./ui/fields";

import fieldsForAddSubject from "./const/fieldsForAddSubject.js";

import useAddSubject from "./model/useAddSubject.js";
import { useGoBack } from '../../../shared/hooks'

export default function EditDeveloper() {
  useGoBack(`/`)
  const addSubjectState = useAddSubject(fieldsForAddSubject);

  return (
		<>
			<div className='container-add-subject'>
				<ErrorMessage errors={[addSubjectState.error]}></ErrorMessage>
				<div className='content-add-subject'>
					<AdminHeader name='Адмін панель'>
						Добавляй предмети, викладача, завдання та інше.
					</AdminHeader>
					<Fields
						onChange={addSubjectState.handleFieldChange}
						fields={fieldsForAddSubject}
					/>
				</div>
				<Button
					className='blue-button fixed-button'
					onClick={() => addSubjectState.handlePost()}
					disabled={addSubjectState.isLoading}
					leftIcon={
						addSubjectState.isLoading && (
							<Loading className='buying-task-spinner' />
						)
					}
				>
					{addSubjectState.isLoading ? 'Виконується запит' : 'Підтвердити'}
				</Button>
			</div>
		</>
	)
}
