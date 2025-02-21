import { useState, useEffect } from "react";
import getInvitedUser from "../../../../entities/invited-user/api/getInvitedUser.js";

export const useSelectedInvitedUsers = () => {
  const [selectedInvitedUsers, setSelectedInvitedUsers] = useState([]);

  useEffect(() => {
    getInvitedUser()
    .then((data) => {
      setSelectedInvitedUsers(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return selectedInvitedUsers;
};