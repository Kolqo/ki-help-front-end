const useChangeObjState = (setCheckedState) => {
  if (typeof setCheckedState !== 'function') {
    throw new TypeError('setCheckedState must be a function');
  }
  const handleCheckboxChangeState = (index) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return handleCheckboxChangeState;
};

export default useChangeObjState;