import { useState } from "react";

const useDownload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = (fileUrl, fileName) => {
    if (window.Telegram && window.Telegram.WebApp) {
      const isWindows = window.Telegram.WebApp.platform === 'tdesktop';
      const version = Number(window.Telegram.WebApp.version) || 0;

      if (isWindows || version < 8) {
        setIsLoading(true);
        const downloadLink = "https://drive.google.com/uc?export=download&id=1QLPsqPSpJUoyrhCk5rXF1SXaa8hZEMDo";

        const iframe = document.createElement('iframe');

        iframe.style.display = 'none';
        iframe.src = downloadLink;

        document.body.appendChild(iframe);

        setTimeout(() => {
          document.body.removeChild(iframe);
          setIsLoading(false);
        }, 4000); 
      } else {
        setIsLoading(true);
        window.Telegram.WebApp.downloadFile({ url: fileUrl, file_name: fileName });
        setTimeout(() => setIsLoading(false), 2000); 
      }
    } else {
      console.error('Telegram WebApp is not available');
    }
  };

  return { isLoading, handleDownload };
};

export default useDownload;