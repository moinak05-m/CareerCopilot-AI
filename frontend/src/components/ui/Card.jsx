import { cn } from "../../utils/cn";

export default function Card({ className, children, padded = true, ...rest }) {
  return (
    <div className={cn("card", padded && "p-5 sm:p-6", className)} {...rest}>
      {children}
    </div>
  );
}
