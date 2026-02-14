import "./styles.css";

export default function LoadingTask(props) {
  const tasks = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-tasks'>
			<div className='header'>
				<div className='info'>
					<div className='loading-name' />
					<div className='loading-price' />
				</div>
				{props.showButton && <div className='button' />}
			</div>
			<div className='bottom'>
				<div className='developer' />
				{props.showIcons ? (
					<div className='icons'>
						<div className='icon' />
						<div className='icon' />
						<div className='icon' />
					</div>
				) : (
					<div className='time' />
				)}
			</div>
		</div>
	))

  return (
    <div className={`style-loading-task ${props.className || ""}`}>
      {tasks}
    </div>
  );
}