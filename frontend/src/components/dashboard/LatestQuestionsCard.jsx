import { MessagesSquare, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

const toneByDifficulty = {
  easy: "forest",
  medium: "amber",
  hard: "coral",
};

export default function LatestQuestionsCard({ questions = [] }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessagesSquare className="h-4.5 w-4.5 text-forest-600 dark:text-forest-300" />
          <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50">Latest interview questions</h3>
        </div>
        <Link to="/interview" className="text-xs font-medium text-forest-600 dark:text-forest-300 flex items-center gap-1 hover:underline">
          View all <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      {questions.length === 0 ? (
        <p className="text-sm text-ink-400 py-6 text-center">No questions generated yet.</p>
      ) : (
        <ul className="space-y-3">
          {questions.slice(0, 4).map((q, i) => (
            <li key={q.id || i} className="flex items-start gap-3 text-sm">
              <Badge tone={toneByDifficulty[q.difficulty?.toLowerCase()] || "ink"} className="mt-0.5 shrink-0 capitalize">
                {q.difficulty || "general"}
              </Badge>
              <p className="text-ink-700 dark:text-paper-200 leading-relaxed">{q.question || q.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
