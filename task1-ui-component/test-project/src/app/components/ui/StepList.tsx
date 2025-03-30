import StepItem from "./StepItem";

export interface StepItemData {
  number: number;
  title: string;
  description: string;
}

interface StepsListProps {
  steps: StepItemData[];
  title?: string;
  className?: string;
}

export default function StepsList({
  steps,
  title = "How it works",
  className = "",
}: StepsListProps) {
  return (
    <div className={`mt-8 ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <StepItem
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}
