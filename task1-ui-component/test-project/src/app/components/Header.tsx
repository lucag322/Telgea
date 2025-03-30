import Link from "next/link";
import Logo from "./ui/Logo";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`container mx-auto py-8 ${className}`}>
      <div className="flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
