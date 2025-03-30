import React, { useCallback } from "react";
import clsx from "clsx"; // Import clsx for better conditional class management (npm install clsx)

// Define prop types with clear documentation
interface ButtonProps {
  /**
   * Function to execute when the button is clicked
   */
  onClick: () => void;

  /**
   * Text displayed inside the button
   * @default "Click me"
   */
  text?: string;

  /**
   * Disables the button when true
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes for customization
   */
  className?: string;
}

/**
 * A reusable button component with optimized styling and event handling.
 *
 * @example
 * <BetterButton onClick={() => console.log('Clicked')} text="Submit" />
 */
export default function BetterButton({
  onClick,
  text = "Click me",
  disabled = false,
  className = "",
}: ButtonProps) {
  /**
   * Using `useCallback` to prevent the `onClick` function
   * from being recreated on every render.
   * This improves performance, especially in lists or frequently re-rendered components.
   */
  const handleClick = useCallback(() => {
    if (!disabled) onClick();
  }, [onClick, disabled]);

  return (
    <button
      onClick={handleClick} // Executes the function only if `disabled` is false
      disabled={disabled} // Disables the button in the browser
      className={clsx(
        "bg-blue-600 text-white py-2 px-4 rounded", // Base button styles
        {
          "hover:bg-blue-700": !disabled, // Applies hover effect if the button is active
          "opacity-50 cursor-not-allowed": disabled, // Makes button appear disabled and prevents interaction
        },
        className // Adds custom classes passed as props
      )}
      type="button" // Explicitly defines the type to avoid unexpected behavior
      aria-disabled={disabled} // Improves accessibility for screen readers
      aria-pressed={disabled} // Indicates the button's interactive state
    >
      {text} {/* Displays the button text */}
    </button>
  );
}
