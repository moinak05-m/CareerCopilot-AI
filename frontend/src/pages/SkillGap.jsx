import { useCallback } from "react";
import { PieChart } from "lucide-react";
import { skillGapService } from "../services/skillGapService";
import { useApi } from "../hooks/useApi";
import CircularScore from "../components/ui/CircularScore";
import SkillBars from "../components/skillgap/SkillBars";
import SkillChips from "../components/skillgap/SkillChips";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";
import EmptyState from "../components/ui/EmptyState";
import { clampPercent } from "../utils/format";

export default function SkillGap() {
  const fetcher = useCallback(() => skillGapService.getSkillGap(), []);
  const { data, loading, error, refetch } = useApi(fetcher);

  if (loading) {
    return (
      <div className="grid lg:grid-cols-3 gap-4">
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
          icon={PieChart}
          title="No career goal set"
          description="Set a target role first so we can compare your current skills to what the job requires."
        />
      );
    }
    return <ErrorScreen description="We couldn't load your skill gap analysis." onRetry={refetch} />;
  }

  const result = data?.result || data || {};
  const matched = result.matchedSkills || result.matched || [];
  const missing = result.missingSkills || result.missing || [];
  const current = result.currentSkills || result.current || matched;
  const gapPercent = clampPercent(
    result.gapPercent ?? result.skillGapPercent ?? (missing.length + matched.length > 0 ? Math.round((missing.length / (missing.length + matched.length)) * 100) : 0)
  );
  const matchPercent = 100 - gapPercent;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">Skill gap analysis</h2>
        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
          How your current skill set compares with what your target role needs.
        </p>
      </div>

      <div className="card flex flex-col sm:flex-row items-center gap-8">
        <CircularScore value={matchPercent} tone="forest" label="match" size={170} />
        <div className="flex-1 grid grid-cols-3 gap-4 w-full">
          <div>
            <p className="label-text">Matched</p>
            <p className="font-display text-2xl font-bold text-forest-600 dark:text-forest-300 mt-1">{matched.length}</p>
          </div>
          <div>
            <p className="label-text">Missing</p>
            <p className="font-display text-2xl font-bold text-coral-500 mt-1">{missing.length}</p>
          </div>
          <div>
            <p className="label-text">Gap</p>
            <p className="font-display text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{gapPercent}%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <SkillBars title="Your current skills" skills={current} tone="forest" emptyText="No skills detected yet." />
        <SkillChips title="Matched skills" skills={matched} tone="forest" emptyText="No matches yet." />
      </div>
      <SkillChips title="Missing skills" skills={missing} tone="coral" emptyText="No missing skills — you're fully matched!" />
    </div>
  );
}
