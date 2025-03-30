import { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-secondary text-white hover:bg-primary",
    secondary: "bg-[#e0ff4f] text-black hover:bg-[#d5f03c] active:bg-[#c8e033]",
    outline:
      "bg-transparent border border-black text-black hover:bg-black/5 active:bg-black/10",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
  };

  // Définition des styles selon les tailles
  const sizeStyles = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  // État désactivé ou chargement
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
        rounded-sm font-medium transition-colors
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
