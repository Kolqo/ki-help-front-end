import { useState } from 'react'

const useTechWork = () => {
  const [isTechWork, setIsTechWork] = useState(true)

  const toggleTechWork = () => {
    setIsTechWork(prevState => {
      const nextState = true
      return nextState
    })
  }

  return { isTechWork, toggleTechWork }
}

export default useTechWork
