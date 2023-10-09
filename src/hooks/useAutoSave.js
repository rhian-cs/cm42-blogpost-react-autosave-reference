import { useState } from "react";

const AUTOSAVE_DEBOUNCE_TIME = 2000;

export const useAutoSave = ({ onSave }) => {
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [isPendingSave, setIsPendingSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatchAutoSave = (formData) => {
    clearTimeout(autoSaveTimer);

    setIsPendingSave(true);

    const timer = setTimeout(
      () => triggerSave(formData),
      AUTOSAVE_DEBOUNCE_TIME
    );

    setAutoSaveTimer(timer);
  };

  const triggerManualSave = async (formData) => {
    clearTimeout(autoSaveTimer);
    setIsPendingSave(true);
    await triggerSave(formData);
  };

  const triggerSave = async (formData) => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);

    setIsPendingSave(false);
  };

  return { dispatchAutoSave, triggerManualSave, isPendingSave, isSaving };
};
