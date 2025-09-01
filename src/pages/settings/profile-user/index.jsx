import "./styles.css";

import { useState } from "react";

import { Users } from "./ui";
import { GrayInput, ErrorMessage, ScrollTopButton } from "../../../shared/ui";

import { useBanUser, useGetUsers } from "../../../features/user/model";
import { useGoBack, useShowPopup } from "../../../shared/hooks";

export default function ProfileUser() {
  useGoBack(`/settings/admin-panel`);
  
  const [inputValue, setInputValue] = useState('');

  const showPopupState = useShowPopup();
  const getUsersState = useGetUsers();
  const banUserState = useBanUser();

  const filteredUsers = getUsersState.users.filter((user) =>
    user.username.includes(inputValue)
  );


  return (
		<>
			<div className='container-profile-user'>
				<ErrorMessage errors={[getUsersState.error, banUserState.error]} />
				<ScrollTopButton />
				<GrayInput
					placeholder='Пошук по імені користувача'
					onChange={setInputValue}
				/>
				<Users
					getUsersState={getUsersState}
					filteredUsers={filteredUsers}
					banUserState={banUserState}
					showPopupState={showPopupState}
				/>
			</div>
		</>
	)
}
