import { useState, useEffect, useRef } from "react";

import { useErrorMessage, useScrollPagination } from "../../../shared/hooks";
import { getTransactions } from "../../../entities/transaction/api";

const useSelectedTasks = (walletId, isMoreTr) => {
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useErrorMessage();
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const isAnyDataRef = useRef(true);

  const fetchTask = () => {
    if (!walletId) return;

    setIsLoading(true);
    getTransactions(walletId, currentPage)
      .then((data) => {
        isAnyDataRef.current = !!data?.length;
        setTransactions((prevState) => [...prevState, ...data]);
        setCurrentPage((prevState) => prevState + 1);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
        А;
      })
      .finally(() => setFetching(false));
  };

  const reset = () => {
    setTransactions([]);
    setCurrentPage(0);
    isAnyDataRef.current = true;
    setFetching(true);
  };

  useEffect(() => {
    if (fetching && walletId) {
      fetchTask();
    }
  }, [fetching, walletId]);

  useEffect(() => {
    reset();
  }, [walletId, isMoreTr]);

  
  useScrollPagination(() => setFetching(true), isAnyDataRef.current);

  return {
    error: { isError: isError, errorMessage: errorMessage },
    isLoading,
    transactions,
    refetch: reset,
  };
};

export default useSelectedTasks;
