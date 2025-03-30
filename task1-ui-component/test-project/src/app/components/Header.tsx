"use client";
import Link from "next/link";
import Logo from "./ui/Logo";
import { useUI } from "../context/UIContext";

interface HeaderWithContextProps {
  className?: string;
}

export default function HeaderWithContext({
  className = "",
}: HeaderWithContextProps) {
  const { showHeaderCancel, onHeaderCancel, currentStep } = useUI();

  // Vérifier si nous sommes sur la page de succès
  const isSuccessPage = currentStep === "success";

  return (
    <header className={`container mx-auto py-8 ${className}`}>
      {isSuccessPage ? (
        // Header pour la page de succès avec logo centré
        <div className="flex justify-center items-center">
          <Link href="/" className="mx-auto">
            <Logo />
          </Link>
        </div>
      ) : (
        // Header normal pour les autres pages
        <div className="flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>

          {showHeaderCancel && onHeaderCancel && (
            <button
              onClick={onHeaderCancel}
              className="text-secondary-foreground hover:text-gray-600 transition-colors"
            >
              Cancel <span className="ml-1">×</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
