import React from "react";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/components/toggleAction.module.scss";

interface ToggleActionProps {
  isChecked: boolean;
  onToggle: (action: "ADD" | "REMOVE") => Promise<void>;
  onAuthRequired: () => void;
  icon: React.ReactNode;
  inputId: string;
  className?: string;
  ariaLabel?: string;
}

export const ToggleAction = ({
  isChecked,
  onToggle,
  onAuthRequired,
  icon,
  inputId,
  className,
  ariaLabel,
}: ToggleActionProps) => {
  const currentUser = useAuthStore((s) => s.currentUser);

  const handleInteraction = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!currentUser) return onAuthRequired();

    const action = isChecked ? "REMOVE" : "ADD";
    await onToggle(action);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      await handleInteraction(e);
    }
  };

  return (
    <label
      className={className}
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <input type="checkbox" checked={isChecked} readOnly id={inputId} aria-label={ariaLabel} />
      <span className={styles.toggleIcon}>{icon}</span>
    </label>
  );
};
