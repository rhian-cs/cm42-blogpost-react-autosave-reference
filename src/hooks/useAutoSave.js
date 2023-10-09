import { useState } from "react";

const AUTOSAVE_DEBOUNCE_TIME = 2000;

export const useAutoSave = ({ onSave }) => {
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  const dispatchAutoSave = (formData) => {
    clearTimeout(autoSaveTimer);

    const timer = setTimeout(() => onSave(formData), AUTOSAVE_DEBOUNCE_TIME);

    setAutoSaveTimer(timer);
  };

  const triggerManualSave = (formData) => {
    clearTimeout(autoSaveTimer);
    onSave(formData);
  };

  return { dispatchAutoSave, triggerManualSave };
};
