import { useState, useEffect } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { routerList } from '../routers/router-list'

import autoAuth from '../../features/auth/api/autoAuth.js'
import { useRoles } from '../../shared/hooks'

const useRouterConfig = () => {
	const [userCourse, setUserCourse] = useState(null)
	const { getJwt } = useRoles()

	useEffect(() => {
		const authenticate = async () => {
			try {
				await autoAuth()
        const jwt = getJwt()
				setUserCourse(jwt?.courseNumber)
			} catch (err) {
				console.error('Авторизація не вдалася:', err)
			}
		}
		authenticate()
	}, [])

	if (userCourse === null) {
		return null
	}
  
	const currentRouterList = routerList(userCourse, setUserCourse)
	const router = createBrowserRouter(currentRouterList)
	return router
}

export default useRouterConfig
