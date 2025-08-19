import { useNavigate } from 'react-router-dom'

import { CategoriesWrapper, Adder } from '../../../../../shared/ui'

import { useRoles } from '../../../../../shared/hooks'

export default function SubjectAdder() {
	const navigate = useNavigate()

	const { isAdmin } = useRoles()

	return (
		<>
			{isAdmin() && (
				<Adder
					centerText='Додати предмет'
					onClick={() => navigate(`/subject-form/add`)}
				/>
			)}
		</>
	)
}
