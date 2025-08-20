import './styles.css'

export default function UsernameWrapper(props) {
  const username = props.children?.replace('@', '')
  const tg = window.Telegram.WebApp

	return (
		<span
			className='style-username-wrapper no-focus-and-active no-underline'
			onClick={() => tg.openTelegramLink(`https://t.me/${username}`)}
		>
			{props.children}
		</span>
	)
}
