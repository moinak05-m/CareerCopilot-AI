import { Crosshair, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GoalCard({ goal }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crosshair className="h-4.5 w-4.5 text-forest-600 dark:text-forest-300" />
          <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50">Career goal</h3>
        </div>
        <Link to="/career-goal" className="text-xs font-medium text-forest-600 dark:text-forest-300 flex items-center gap-1 hover:underline">
          {goal ? "Update" : "Set goal"} <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      {goal ? (
        <>
          <p className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">{goal.title || goal.role}</p>
          {goal.timeline && <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">Target: {goal.timeline}</p>}
        </>
      ) : (
        <p className="text-sm text-ink-400 py-2">No career goal set yet. Pick a target role to unlock tailored scoring.</p>
      )}
    </div>
  );
}
