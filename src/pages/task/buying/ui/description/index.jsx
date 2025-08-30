import './styles.css'
import { useEffect, useRef, useState } from 'react'
import { UsernameWrapper } from '../../../../../shared/ui'

export default function Description(props) {
	const [isExpanded, setIsExpanded] = useState(true)
	const [isTruncated, setIsTruncated] = useState(false)

	const textRef = useRef(null)

	useEffect(() => {
		if (textRef.current) {
			const el = textRef.current
			setIsTruncated(el.scrollHeight > el.clientHeight + 1) 
		}
	}, [props.task.description])

  if (!props.task.description) return null

	return (
		<>
			<div className='style-description'>
				<div className='description'>
					<p className='header'>
						Інструкція від{' '}
						<UsernameWrapper>{props.task.developer.username}</UsernameWrapper>
					</p>
					<p
						className={`text ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
						ref={textRef}
					>
						{props.task.description}
					</p>
				</div>
				{isTruncated && (
					<div className='action'>
						<p
							className='action-item no-select'
							onClick={() => setIsExpanded(prevState => !prevState)}
						>
							{isExpanded ? 'розгорнути' : 'згорнути'}
						</p>
					</div>
				)}
			</div>
		</>
	)
}
