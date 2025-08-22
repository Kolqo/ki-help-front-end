import { useNavigate } from "react-router-dom"

import { Adder, CategoriesWrapper } from "../../../../../shared/ui"
import { useRoles } from '../../../../../shared/hooks'

export default function TaskAdder(props) {
  const navigate = useNavigate()

  const { isAdmin } = useRoles()

	return (
		<>
			<CategoriesWrapper>
				<Adder
					centerText='Додати завдання'
					onClick={() =>
						navigate(`/list-task/${props.subjectID}/task-form/add`)
					}
					isVisible={isAdmin() && props.teacher}
				/>
			</CategoriesWrapper>
		</>
	)
}
