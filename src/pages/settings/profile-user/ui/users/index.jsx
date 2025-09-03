import "./styles.css";

import { useNavigate } from "react-router-dom";

import { LoadingUserCard, UserCard } from "../../../../../entities";

import { ActionPopup } from "../../../../../shared/ui";

import { userPopupItems } from "../../../../../entities/user/const";

export default function Users(props) {
  const navigate = useNavigate();

  return (
		<>
			<div className='style-tasks'>
				{props.showPopupState.position && (
					<ActionPopup
						ref={props.showPopupState.menuRef}
						items={userPopupItems(
							props.banUserState.handlePatch,
							props.showPopupState.item,
							props.getSearchState.refetch,
							navigate
						)}
						onClick={props.showPopupState.close}
						position={props.showPopupState.position}
					/>
				)}
				{props.filteredUsers.map(item => (
					<UserCard
						key={item.id}
						item={item}
						handleLeftClick={props.showPopupState.handleLeftClick}
					/>
				))}
				<div ref={props.getSearchState.sentinelRef} style={{ height: 1 }} />
			</div>
			{props.getSearchState.isLoading && <LoadingUserCard count='2' />}
		</>
	)
}
