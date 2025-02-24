import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model/index.js";
import postSendSupportQuestion from "../../../../entities/user/api/postSendSupportQuestion.js"

const useSendMessage = () => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();
  const [errorSendingMassage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSentMessage = async (message, files) => {
    try {
      setIsLoading(true)
      await postSendSupportQuestion(message, files);
      setIsLoading(false)
      navigate(`/settings`)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message)
      setError(true);
      setIsLoading(false)
    }
  } 
  const errorSending = error
  return {
    errorSending,
    errorSendingMassage,
    isLoading,
    handleSentMessage,
  }
};

export default useSendMessage;