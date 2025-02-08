import { useState, useCallback } from "react";
import getRoles from "../const/getRoles";

export function useRoles() {
  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleSelect = useCallback((roleId, isChecked) => {
    setSelectedRoles(prev => ({
      ...prev,
      [roleId]: isChecked
    }));
  }, []);

  const validateSelection = useCallback(() => {
    const selected = getRoles.filter(role => selectedRoles[role.id]);
    return {
      isValid: selected.length === 1,
      selectedRoles: selected[0] || null
    };
  }, [selectedRoles]);

  return {
    selectedRoles,
    handleRoleSelect,
    validateSelection
  };
}