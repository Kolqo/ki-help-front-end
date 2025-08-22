import './styles.css'

import React, { useState } from 'react'
import { ArrowIcon } from '../../../assets/svg'

export default function Table(props) {
  const [openRows, setOpenRows] = useState({})

	const toggleRow = key => {
		setOpenRows(prev => ({
			...prev,
			[key]: !prev[key],
		}))
	}

  if (!props.data) {
    return null
  }

	return (
		<div className='table-wrapper'>
			<table className='style-table'>
				<tbody>
					{Object.entries(props.data).map(([key, value]) => {
						if (Array.isArray(value)) {
							return (
								<React.Fragment key={key}>
									<tr>
										<td className='key'>{key}</td>
										<td
											className='value array-header no-select'
											onClick={() => toggleRow(key)}
										>
											<p>Показати всіх</p>
											<ArrowIcon fill='#999999' />
										</td>
									</tr>
									{openRows[key] &&
										value.map((item, idx) => (
											<tr key={`${key}-${idx}`}>
												<td className='key'></td>
												<td className='value array-value'>{item}</td>
											</tr>
										))}
								</React.Fragment>
							)
						} else {
							return (
								<tr key={key}>
									<td className='key'>{key}</td>
									<td className='value'>{value}</td>
								</tr>
							)
						}
					})}
				</tbody>
			</table>
		</div>
	)
}
