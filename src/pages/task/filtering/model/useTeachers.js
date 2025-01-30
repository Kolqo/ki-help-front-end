import { useCallback, useState } from "react";
import getTeachers from "../../../../entities/checkbox-list/api/getTeachers.js";

export function useTeachers() {
  const [selectedTeachers, setSelectedTeachers] = useState({});

  const handleTeacherSelect = useCallback((teacherId, isChecked) => {
    setSelectedTeachers(prev => ({
      ...prev,
      [teacherId]: isChecked
    }));
  }, []);

  const validateSelection = useCallback(() => {
    const selected = getTeachers.filter(teacher => selectedTeachers[teacher.id]);
    return {
      isValid: selected.length === 1,
      selectedTeacher: selected[0] || null
    };
  }, [selectedTeachers]);

  return {
    selectedTeachers,
    handleTeacherSelect,
    validateSelection
  };
}