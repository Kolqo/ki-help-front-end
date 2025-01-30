import { useState, useCallback } from "react";
import getCreators from "../../../../entities/checkbox-list/api/getCreators.js";

export function useCreators() {
  const [selectedCreators, setSelectedCreators] = useState({});

  const handleCreatorSelect = useCallback((creatorId, isChecked) => {
    setSelectedCreators(prev => ({
      ...prev,
      [creatorId]: isChecked
    }));
  }, []);

  const validateSelection = useCallback(() => {
    const selected = getCreators.filter(creator => selectedCreators[creator.id]);
    return {
      isValid: selected.length === 1,
      selectedCreator: selected[0] || null
    };
  }, [selectedCreators]);

  return {
    selectedCreators,
    handleCreatorSelect,
    validateSelection
  };
}