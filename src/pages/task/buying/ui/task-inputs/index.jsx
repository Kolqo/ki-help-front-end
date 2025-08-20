import './styles.css'

import { useRef, useState } from 'react'

import { Adder, GroupInput, SectionWrapper } from '../../../../../shared/ui'

import { useInputGroup } from '../../../../../shared/hooks'

export default function TaskInputs(props) {
	const inputRefs = useRef([])

	const [fields, setFields] = useState(() => {
		if (props.task.type === 'REGULAR' && props.task?.arguments) {
			return props.task.arguments.map(arg => ({
				section: { header: arg.name },
				placeholder: arg.description,
			}))
		} else {
			return [
				{
					section: { header: 'ПИТАННЯ №1' },
					placeholder: 'Напишіть питання',
				},
			]
		}
	})

	const { handleKeyDown, getAllValues } = useInputGroup(
		inputRefs,
		fields?.length || 0
	)

	if (props.task.type === 'REGULAR') {
		return (
			<>
				<div className='style-task-inputs'>
					<GroupInput
						fields={fields}
						inputRefs={inputRefs}
						onKeyDown={handleKeyDown}
						onChange={() => {
							const values = getAllValues()
							props.handleOnChange(values)
							props.setArgs(values)
						}}
					/>
				</div>
			</>
		)
	}

	return (
		<>
			<div className='style-task-inputs'>
				<GroupInput
					fields={fields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => props.handleOnChange(getAllValues())}
				/>
				{fields.length < 10 && (
					<SectionWrapper
						section={{
							footer:
								'Нажавши на кнопку у вас з’явиться додаткове поле вводу для нового запитання.',
						}}
					>
						<Adder
							centerText='Додати питання'
							onClick={() => {
								if (fields.length < 10) {
									setFields(prevState => [
										...prevState,
										{
											section: { header: `ПИТАННЯ №${fields.length + 1}` },
											placeholder: 'Напишіть питання',
										},
									])
								}
							}}
							isVisible
						/>
					</SectionWrapper>
				)}
			</div>
		</>
	)
}
