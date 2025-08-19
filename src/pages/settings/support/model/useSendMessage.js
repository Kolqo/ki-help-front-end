import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from '../../../../shared/hooks'
import postSendSupportQuestion from "../../../../entities/user/api/postSendSupportQuestion.js"

const useSendMessage = () => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();
  const [errorSendingMassage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSentMessage = async (message, files) => {

    if (window.Telegram.WebApp.initDataUnsafe.user.username == null) {
      setError(true);
      setErrorMessage("Поставте нікнейм перед покупкою завдання.")
      return;
    }

    try {
      setIsLoading(true)
      await postSendSupportQuestion(message, files);
      setIsLoading(false)
      navigate(`/settings`)
    } catch (error) {
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