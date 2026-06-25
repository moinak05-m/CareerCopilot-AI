import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Map } from "lucide-react";
import { roadmapService } from "../services/roadmapService";
import { useApi } from "../hooks/useApi";
import TimelineItem from "../components/roadmap/TimelineItem";
import ProgressBar from "../components/ui/ProgressBar";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";
import EmptyState from "../components/ui/EmptyState";
import { clampPercent } from "../utils/format";

export default function Roadmap() {
  const fetcher = useCallback(() => roadmapService.getRoadmap(), []);
  const { data, loading, error, refetch, setData } = useApi(fetcher);
  const [togglingId, setTogglingId] = useState(null);

  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    const status = error?.response?.status;
    if (status === 404) {
      return (
        <EmptyState
          icon={Map}
          title="No roadmap yet"
          description="Set a career goal and upload your resume to generate a personalized learning roadmap."
        />
      );
    }
    return <ErrorScreen description="We couldn't load your roadmap." onRetry={refetch} />;
  }

  const result = data?.roadmap || data || {};
  const milestones = result.milestones || result.items || [];
  const completedCount = milestones.filter((m) => m.completed).length;
  const progress = clampPercent(
    result.progress ?? (milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0)
  );

  const handleToggle = async (milestone) => {
    const id = milestone.id || milestone._id;
    if (!id) return;
    setTogglingId(id);
    const nextCompleted = !milestone.completed;
    try {
      await roadmapService.markCompleted(id, nextCompleted);
      const updatedMilestones = milestones.map((m) =>
        (m.id || m._id) === id ? { ...m, completed: nextCompleted } : m
      );
      setData({ ...(data || {}), roadmap: { ...result, milestones: updatedMilestones }, milestones: updatedMilestones });
      toast.success(nextCompleted ? "Milestone marked complete." : "Milestone marked incomplete.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't update milestone.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">Roadmap</h2>
        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
          Your month-by-month plan toward {result.goalTitle || "your target role"}.
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <p className="label-text">Overall progress</p>
          <span className="text-sm font-medium text-ink-700 dark:text-paper-100">
            {completedCount}/{milestones.length} milestones
          </span>
        </div>
        <ProgressBar value={progress} tone="forest" height="h-2.5" />
      </div>

      {milestones.length === 0 ? (
        <EmptyState
          icon={Map}
          title="Your roadmap is empty"
          description="Once your resume and goal are processed, milestones will appear here."
        />
      ) : (
        <div className="pt-2">
          {milestones.map((m, i) => (
            <TimelineItem
              key={m.id || m._id || i}
              milestone={m}
              isLast={i === milestones.length - 1}
              onToggle={handleToggle}
              toggling={togglingId === (m.id || m._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
