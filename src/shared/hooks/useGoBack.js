import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useGoBack = url => {
	const navigate = useNavigate()

	useEffect(() => {
		const backButton = window.Telegram?.WebApp?.BackButton
		if (!backButton) return

		backButton.show()

		const handler = () => {
			navigate(url)
			backButton.hide()
		}

		backButton.onClick(handler)

		return () => {
			backButton.offClick(handler)
			backButton.hide()
		}
	}, [navigate, url])
}

export default useGoBack
