import { motion } from "framer-motion";

export default function PageLoader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="relative h-12 w-12">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-forest-200 dark:border-forest-800"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-forest-600"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />
      </div>
      <p className="text-sm text-ink-500 dark:text-paper-300">{label}…</p>
    </div>
  );
}
