import "./styles.css";

export default function AdminHeader(props) {
  return (
		<>
			<div className={`admin-header-area ${props.className || ''}`}>
				<div className='admin-header'>{props.text.header}</div>
				<div className='admin-footer'>{props.text.footer}</div>
			</div>
		</>
	)
}
