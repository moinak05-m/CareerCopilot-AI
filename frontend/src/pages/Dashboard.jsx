import { useCallback } from "react";
import { FileCheck2, ScanSearch, PieChart, ListX } from "lucide-react";
import { dashboardService } from "../services/dashboardService";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import GoalCard from "../components/dashboard/GoalCard";
import RoadmapProgressCard from "../components/dashboard/RoadmapProgressCard";
import LatestQuestionsCard from "../components/dashboard/LatestQuestionsCard";
import StatCard from "../components/ui/StatCard";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";
import { clampPercent } from "../utils/format";

export default function Dashboard() {
  const { user } = useAuth();
  const fetcher = useCallback(() => dashboardService.getSummary(), []);
  const { data, loading, error, refetch } = useApi(fetcher);

  if (error) {
    return <ErrorScreen description="We couldn't load your dashboard summary." onRetry={refetch} />;
  }

  const summary = data || {};
  const resumeUploaded = !!summary.resumeUploaded || !!summary.resume?.uploaded;
  const atsScore = clampPercent(summary.atsScore ?? summary.ats?.score ?? 0);
  const skillGapPercent = clampPercent(summary.skillGapPercent ?? summary.skillGap?.percent ?? 0);
  const missingSkillsCount = summary.missingSkillsCount ?? summary.skillGap?.missing?.length ?? 0;
  const roadmapProgress = summary.roadmapProgress ?? summary.roadmap?.progress ?? 0;

  return (
    <div className="space-y-6">
      <WelcomeBanner name={summary.user?.name || user?.name} goalTitle={summary.careerGoal?.title || summary.careerGoal?.role} />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              icon={FileCheck2}
              label="Resume"
              value={resumeUploaded ? "Uploaded" : "Not uploaded"}
              sub={summary.resume?.fileName || (resumeUploaded ? "Ready for scoring" : "Upload to get started")}
              tone={resumeUploaded ? "forest" : "coral"}
              delay={0}
            />
            <StatCard
              icon={ScanSearch}
              label="ATS score"
              value={`${atsScore}/100`}
              sub="Based on your latest resume"
              tone={atsScore >= 70 ? "forest" : atsScore >= 40 ? "amber" : "coral"}
              delay={0.05}
            />
            <StatCard
              icon={PieChart}
              label="Skill gap"
              value={`${skillGapPercent}%`}
              sub="Match to your target role"
              tone={skillGapPercent >= 70 ? "forest" : "amber"}
              delay={0.1}
            />
            <StatCard
              icon={ListX}
              label="Missing skills"
              value={missingSkillsCount}
              sub="Skills left to close the gap"
              tone={missingSkillsCount === 0 ? "forest" : "amber"}
              delay={0.15}
            />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <GoalCard goal={summary.careerGoal} />
            <RoadmapProgressCard
              progress={roadmapProgress}
              totalMilestones={summary.roadmap?.total ?? summary.roadmapTotal ?? 0}
              completedMilestones={summary.roadmap?.completed ?? summary.roadmapCompleted ?? 0}
            />
            <LatestQuestionsCard questions={summary.latestQuestions || summary.interviewQuestions || []} />
          </>
        )}
      </div>
    </div>
  );
}
