import { Map, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressBar from "../ui/ProgressBar";
import { clampPercent } from "../../utils/format";

export default function RoadmapProgressCard({ progress = 0, totalMilestones = 0, completedMilestones = 0 }) {
  const pct = clampPercent(progress);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Map className="h-4.5 w-4.5 text-forest-600 dark:text-forest-300" />
          <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50">Roadmap progress</h3>
        </div>
        <Link to="/roadmap" className="text-xs font-medium text-forest-600 dark:text-forest-300 flex items-center gap-1 hover:underline">
          Open roadmap <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex items-end justify-between mb-2">
        <span className="font-display text-3xl font-bold text-ink-900 dark:text-paper-50">{pct}%</span>
        <span className="text-xs text-ink-500 dark:text-paper-300">
          {completedMilestones}/{totalMilestones} milestones
        </span>
      </div>
      <ProgressBar value={pct} tone="forest" />
    </div>
  );
}
