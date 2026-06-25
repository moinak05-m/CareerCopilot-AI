import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Badge from "../ui/Badge";

const toneByDifficulty = {
  easy: "forest",
  medium: "amber",
  hard: "coral",
};

export default function QuestionCard({ question, index, total }) {
  const [copied, setCopied] = useState(false);
  const text = question?.question || question?.text || "";
  const difficulty = (question?.difficulty || "general").toLowerCase();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.25 }}
        className="card min-h-[220px] flex flex-col"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-medium text-ink-400">
            Question {index + 1} of {total}
          </span>
          <Badge tone={toneByDifficulty[difficulty] || "ink"} className="capitalize">
            {difficulty}
          </Badge>
        </div>

        <p className="font-display text-lg sm:text-xl font-semibold text-ink-900 dark:text-paper-50 leading-snug flex-1">
          {text}
        </p>

        {question?.category && (
          <p className="text-xs text-ink-400 mt-3">{question.category}</p>
        )}

        <button
          onClick={handleCopy}
          className="self-start mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 dark:text-paper-300 hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-forest-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy question"}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
