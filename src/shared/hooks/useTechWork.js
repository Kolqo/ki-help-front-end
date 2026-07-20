import { useState } from 'react'

const TECH_WORK_KEY = 'techWork'

const useTechWork = () => {
  const [isTechWork, setIsTechWork] = useState(
    localStorage.getItem(TECH_WORK_KEY) === 'true'
  )

  const toggleTechWork = () => {
    setIsTechWork(prevState => {
      const nextState = !prevState
      localStorage.setItem(TECH_WORK_KEY, String(nextState))
      return nextState
    })
  }

  return { isTechWork, toggleTechWork }
}

export default useTechWork
