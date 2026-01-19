import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to handle dropdown state and outside click detection
 * Closes the dropdown when user clicks/taps anywhere outside of it or presses Escape
 *
 * Features:
 * - Outside click detection (mouse and touch)
 * - Escape key to close (accessibility)
 * - Event capture phase for better control
 * - Automatic cleanup
 *
 * @returns Object containing isOpen state, setIsOpen function, and dropdownRef
 */
export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Only add listeners when dropdown is open
    if (isOpen) {
      // Use capture phase to handle before other handlers
      document.addEventListener("mousedown", handleClickOutside, true);
      document.addEventListener("touchstart", handleClickOutside, true);
      document.addEventListener("keydown", handleEscape);
    }

    // Cleanup listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, dropdownRef };
};
