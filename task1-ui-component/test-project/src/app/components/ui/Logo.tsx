import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/Logo.svg"
        alt="Telgea Logo"
        width={133}
        height={33}
        priority
      />
    </div>
  );
}
