import { useCallback } from "react";
import { ThumbsUp, ThumbsDown, Lightbulb, ScanSearch } from "lucide-react";
import { atsService } from "../services/atsService";
import { useApi } from "../hooks/useApi";
import CircularScore from "../components/ui/CircularScore";
import ProgressBar from "../components/ui/ProgressBar";
import InsightList from "../components/ats/InsightList";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";
import EmptyState from "../components/ui/EmptyState";
import { clampPercent, scoreTone } from "../utils/format";

export default function AtsScore() {
  const fetcher = useCallback(() => atsService.getScore(), []);
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
          icon={ScanSearch}
          title="No resume uploaded"
          description="Upload your resume first so we can calculate your ATS compatibility score."
        />
      );
    }
    return <ErrorScreen description="We couldn't load your ATS score." onRetry={refetch} />;
  }

  const result = data?.result || data || {};
  const score = clampPercent(result.score ?? result.atsScore ?? 0);
  const tone = scoreTone(score);
  const strengths = result.strengths || [];
  const weaknesses = result.weaknesses || [];
  const suggestions = result.suggestions || result.recommendations || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">ATS score</h2>
        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
          How well your resume parses through Applicant Tracking Systems.
        </p>
      </div>

      <div className="card flex flex-col sm:flex-row items-center gap-8">
        <CircularScore value={score} tone={tone} label="out of 100" size={170} />
        <div className="flex-1 w-full">
          <p className="label-text mb-2">Overall compatibility</p>
          <ProgressBar value={score} tone={tone} height="h-2.5" />
          <p className="text-sm text-ink-500 dark:text-paper-300 mt-3 leading-relaxed">
            {score >= 80
              ? "Excellent — your resume is well structured for automated screening."
              : score >= 55
              ? "Decent — a few adjustments will meaningfully improve how parsers read your resume."
              : "Needs work — formatting or missing keywords may be causing systems to misread your resume."}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <InsightList title="Strengths" items={strengths} icon={ThumbsUp} tone="forest" emptyText="No strengths identified yet." />
        <InsightList title="Weaknesses" items={weaknesses} icon={ThumbsDown} tone="coral" emptyText="No weaknesses identified yet." />
        <InsightList title="Suggestions" items={suggestions} icon={Lightbulb} tone="amber" emptyText="No suggestions yet." />
      </div>
    </div>
  );
}
