import "./styles.css";

export default function UserHeader(props) {
  return (
		<>
			<div className={`bottom-sheet-header-area ${props.className || ''}`}>
				<div className='bottom-sheet-header'>{props.text.header}</div>
				<div className='bottom-sheet-footer'>{props.text.footer}</div>
			</div>
		</>
	)
}
