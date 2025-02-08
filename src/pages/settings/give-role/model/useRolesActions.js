export function useRolesActions() {
  const handleDoneClick = (validateSelection, navigate, setError) => (e) => {
    e.preventDefault();
    const { isValid } = validateSelection();
    
    if (!isValid) {
      setError(true); 
      return;
    }

    setError(false);

    navigate(`/settings/admin-panel/profile`);
  };

  return {
    handleDoneClick
  };
}