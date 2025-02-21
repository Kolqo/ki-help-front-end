const useDownload = () => {
  const handleDownload = (fileUrl, fileName) => {
    if (window.Telegram && window.Telegram.WebApp) {
      const isWindows = window.Telegram.WebApp.platform === 'tdesktop';
      const version = Number(window.Telegram.WebApp.version) || 0;
      
      if (isWindows || version < 8) {
        window.Telegram.WebApp.openLink(fileUrl);
        return;
      } else {
        window.Telegram.WebApp.downloadFile({ url: fileUrl, file_name: fileName }); // todo замінити 123.txt на fileName
      }

    } else{
      console.error('Telegram WebApp is not available');
    }
  };
  return handleDownload;
};

export default useDownload;