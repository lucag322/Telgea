interface PageTitleProps {
  title: string;
  highlightedText?: string;
  description: string;
}

export default function PageTitle({
  title,
  highlightedText,
  description,
}: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">
        {title}
        {highlightedText && (
          <span className="bg-primary px-1 rounded-sm"> {highlightedText}</span>
        )}
      </h1>
      <p className="text-lg mb-6">{description}</p>
    </div>
  );
}
