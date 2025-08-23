import { useState, useEffect, useRef } from "react";

import {
  useErrorMessage,
  useScrollPagination,
} from "../../../shared/hooks/index.js";

import { getUserByRole } from "../../../entities/user/api";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useErrorMessage();
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const isAnyDataRef = useRef(true);

  const fetchUser = () => {
    setIsLoading(true);
    getUserByRole('ROLE_USER', currentPage, 5)
      .then((data) => {
        isAnyDataRef.current = !!data?.length;
        setUsers((prevState) => [...prevState, ...data]);
        setCurrentPage((prevState) => prevState + 1);
        setIsError(false);
        setIsLoading(false);
      })
      .finally(() => setFetching(false))
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      });
  };

  const reset = () => {
    setUsers([]);
    setCurrentPage(0);
    isAnyDataRef.current = true;
    setFetching(true);
  };

  useEffect(() => {
    if (fetching) {
      fetchUser();
    }
  }, [fetching]);

  useScrollPagination(() => setFetching(true), isAnyDataRef.current);

  return {
    error: { isError: isError, errorMessage: errorMessage },
    isLoading,
    users,
    refetch: reset,
  };
};

export default useGetUsers;
