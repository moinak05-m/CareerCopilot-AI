import { AlertTriangle, RotateCcw } from "lucide-react";
import Button from "./Button";

export default function ErrorScreen({
  title = "Something went wrong",
  description = "We couldn't load this data. Check your connection and try again.",
  onRetry,
}) {
  return (
    <div className="card flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="h-14 w-14 rounded-2xl bg-coral-400/10 flex items-center justify-center mb-4">
        <AlertTriangle className="h-7 w-7 text-coral-500" />
      </div>
      <h3 className="text-lg font-semibold text-ink-900 dark:text-paper-50 font-display">{title}</h3>
      <p className="text-sm text-ink-500 dark:text-paper-300 mt-1.5 max-w-sm">{description}</p>
      {onRetry && (
        <Button variant="secondary" icon={RotateCcw} className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
