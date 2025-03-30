import React from "react";

// Define clear prop types for better type safety and documentation
interface ButtonProps {
  /**
   * Function to call when button is clicked
   */
  onClick: () => void;

  /**
   * Text to display inside the button
   * @default "Click me"
   */
  text?: string;

  /**
   * Sets the button to disabled state when true
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
}

/**
 * A reusable button component with consistent styling
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
  // Extract styles to Tailwind classes for better maintainability and consistency
  // This also makes it easier to adapt to design system changes
  const baseStyle = "bg-blue-600 text-white py-2 px-4 rounded";
  const hoverStyle = "hover:bg-blue-700";
  const disabledStyle = "opacity-50 cursor-not-allowed";

  // Combine styles based on props
  const buttonStyle = `
    ${baseStyle}
    ${!disabled ? hoverStyle : disabledStyle}
    ${className}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle}
      type="button" // Explicit type for accessibility
      aria-disabled={disabled} // Better accessibility
    >
      {text}
    </button>
  );
}
