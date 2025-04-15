import React from "react";
import "./styles.css";

import { PropertyItem } from "../../../../shared/ui/index";

export default function TaskDeveloperContent(props) {
  return (
		<>
			<div>
				{props.item.id === 6 ? (
					<div>
						<PropertyItem
							className={`property-item ${
								props.isExpandedArgs ? 'expanded' : ''
							}`}
							propertyItem={props.item}
							onClick={props.onClick}
						/>
						{props.isExpandedArgs &&
							props.item.content.map((arg, index) => (
								<div className='property-args'>
									<PropertyItem
										className='property-item'
										propertyItem={{
											id: index,
											propertyName: `№${index + 1}`,
											rightComponent: arg,
										}}
									/>
								</div>
							))}
					</div>
				) : (
					<PropertyItem className='property-item' propertyItem={props.item} />
				)}
			</div>
		</>
	)
}
