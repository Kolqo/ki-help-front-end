import "./styles.css";

import { useEffect, useState } from "react";

import { Users } from "./ui";
import { GrayInput, ErrorMessage, ScrollTopButton } from "../../../shared/ui";

import { useBanUser, useGetSearch } from "../../../features/user/model";
import { useDebounce, useGoBack, useShowPopup } from "../../../shared/hooks";

export default function ProfileUser() {
  useGoBack(`/settings/admin-panel`);
  
  const [inputValue, setInputValue] = useState('');

  const showPopupState = useShowPopup();
  const debouncedValue = useDebounce(inputValue, 400)
  const getSearchState = useGetSearch(debouncedValue)
  useEffect(() => {
		console.log(getSearchState.users)
	}, [getSearchState.users])
  const banUserState = useBanUser();

  return (
		<>
			<div className='container-profile-user'>
				<ErrorMessage errors={[getSearchState.error, banUserState.error]} />
				<ScrollTopButton />
				<GrayInput
					placeholder='Пошук по імені користувача'
					onChange={setInputValue}
				/>
				<Users
					getSearchState={getSearchState}
					filteredUsers={getSearchState.users}
					banUserState={banUserState}
					showPopupState={showPopupState}
				/>
			</div>
		</>
	)
}
