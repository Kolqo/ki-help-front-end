import "./styles.css";

export default function BuyHeader(props) {
  return (
		<>
			<div className='buy-header-area'>
				<div>{props.text.header}</div>
				<div>{props.text.footer}</div>
			</div>
		</>
	)
}
