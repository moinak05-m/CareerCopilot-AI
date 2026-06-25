import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  className,
  children,
  icon: Icon,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(variants[variant], className)}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      <span>{children}</span>
    </button>
  );
}
