export default function TaskIcon() {
  const fill = 'var(--ui-text-bg)'
  
  return (
		<>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<rect width='24' height='11.2592' rx='5' fill={fill} />
				<rect
					y='12.9912'
					width='24'
					height='6.06265'
					rx='3.03133'
					fill={fill}
				/>
				<path
					d='M20.7871 20.7863C22.5614 20.7865 23.9998 22.2248 24 23.9991H0C0.00023743 22.2248 1.43857 20.7865 3.21289 20.7863H20.7871Z'
					fill={fill}
				/>
			</svg>
		</>
	)
}
