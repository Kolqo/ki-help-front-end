const useFilterUsers = (inputValue, selectedUsers) => {
  let filteredUser = [...selectedUsers];

  if (inputValue) {
    filteredUser = filteredUser.filter(user => 
      String(user.telegramId).startsWith(inputValue)
    );
  }
  
  return filteredUser;
};

export default useFilterUsers;