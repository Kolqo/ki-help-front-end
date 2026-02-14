import "./styles.css";

export default function LoadingItem(props) {
  return (
		<>
			{Array.from({ length: props.count }).map((_, index) => (
				<div
					style={{ height: `${props.height}px` }}
					key={index}
					className='discount-color-box'
				>
					<div className='header'>
						<div className='text' />
						<div className='items' />
					</div>
					<div className='footer'>
						<div>
              {props.isLeft && <div className='text' />}
            </div>
						<div className='icon' />
					</div>
				</div>
			))}
		</>
	)
}
