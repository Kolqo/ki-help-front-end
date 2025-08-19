import './styles.css'

import { ArrowIcon } from '../../../../assets/svg'
import { useEffect, useState } from 'react'

export default function Button(props) {
  const [scrollTop, setScrollTop] = useState(0)
	useEffect(() => {
		const containerElement = document.querySelector('.container')
		const scrollHandler = () => {
      setScrollTop(containerElement.scrollTop)
		}
		containerElement.addEventListener('scroll', scrollHandler)
		return () => containerElement.removeEventListener('scroll', scrollHandler)
	}, [])

  if (scrollTop < 150) return null
		return (
			<>
				<button className='style-scroll-top-button' onClick={() => {
          const container = document.querySelector('.container')
					container.scrollTo({ top: 0, behavior: 'smooth' })
        }}>
					<ArrowIcon height={19} width={12} />
				</button>
			</>
		)
}
