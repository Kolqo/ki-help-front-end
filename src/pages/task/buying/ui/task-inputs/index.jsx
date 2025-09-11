import './styles.css'

import { useRef } from 'react'

import { Adder, CategoriesWrapper, GroupInput, SectionWrapper } from '../../../../../shared/ui'

import { useInputGroup } from '../../../../../shared/hooks'

export default function TaskInputs(props) {
	const inputRefs = useRef([])

	const { handleKeyDown, getAllValues } = useInputGroup(
		inputRefs,
		props.fields?.length || 0
	)

  const lastArg = props.task.arguments[props.task.arguments.length - 1]

	if (props.task.type === 'REGULAR') {
		return (
			<>
				<div className='style-task-inputs'>
					<GroupInput
						fields={props.fields}
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
					fields={props.fields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => {
						const values = getAllValues()
						props.handleOnChange(values)
						props.setArgs(values)
					}}
				/>
				{props.fields.length < 10 && (
					<SectionWrapper
						section={{
							footer:
								'Нажавши на кнопку у вас з’явиться додаткове поле вводу для нового запитання.',
						}}
					>
						<CategoriesWrapper>
							<Adder
								centerText='Додати питання'
								onClick={() => {
									if (props.fields.length < 10) {
										props.setFields(prevState => [
											...prevState,
											{
												section: {
													header: `${lastArg.name} №${
														props.fields.length - (props.task.arguments.length - 2)
													}`,
												},
												placeholder: !!lastArg.description
													? lastArg.description
													: 'Введіть дані',
											},
										])
									}
								}}
								isVisible
							/>
						</CategoriesWrapper>
					</SectionWrapper>
				)}
			</div>
		</>
	)
}
