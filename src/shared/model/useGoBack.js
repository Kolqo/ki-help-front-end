import { useNavigate } from "react-router-dom";

const useGoBack = (url) => {
  const navigate = useNavigate();
  const backButton = window.Telegram.WebApp.BackButton;
  backButton.show();

  backButton.onClick(function() {
      navigate(url)
      backButton.hide();
  });
};

export default useGoBack
