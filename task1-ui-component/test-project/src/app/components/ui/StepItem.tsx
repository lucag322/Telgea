interface StepItemProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export default function StepItem({
  number,
  title,
  description,
  className = "",
}: StepItemProps) {
  return (
    <div
      className={`flex items-start p-4 bg-custom-white rounded-md ${className}`}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e0ff4f] flex items-center justify-center mr-4">
        <span className="font-bold">{number}</span>
      </div>
      <div>
        <h3 className="font-bold text-base">{title}</h3>
        <p className="text-secondary-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
