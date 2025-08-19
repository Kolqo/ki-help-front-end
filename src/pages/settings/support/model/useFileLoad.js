import { useState }  from "react";

import { useErrorMessage } from '../../../../shared/hooks'
 
const useEditSubject = () => {
  const [ fileValue, setFileValue ] = useState([]);
  const [ errorMassage, setErrorMassage] = useState("");
  const { error, setError } = useErrorMessage();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)[0];
    const isValidSize = newFiles.size > 5242880
    const isValidNumberSize = fileValue.length + 1 > 3

    if (isValidSize) {
      setErrorMassage("Файл не може важити більше 5 мегабайтів")
      setError(true);
    } else if (isValidNumberSize) {
      setErrorMassage("Ви не можете завантажити більше трьох файлів")
      setError(true);
    } 
    else {
      setError(false);
      const files = Array.from(e.target.files);
      setFileValue((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleFileRemove = (indexToRemove) => {
    setFileValue((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
  };

  return {
    error,
    errorMassage,
    fileValue,
    handleFileChange,
    handleFileRemove
  }
};

export default useEditSubject;