import { useCallback, useState } from "react";
import { ArrowRight, RotateCw, MessagesSquare } from "lucide-react";
import { interviewService } from "../services/interviewService";
import { useApi } from "../hooks/useApi";
import QuestionCard from "../components/interview/QuestionCard";
import Button from "../components/ui/Button";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";
import EmptyState from "../components/ui/EmptyState";

export default function Interview() {
  const fetcher = useCallback(() => interviewService.getQuestions(), []);
  const { data, loading, error, refetch } = useApi(fetcher);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  if (loading) return <SkeletonCard />;

  if (error) {
    const status = error?.response?.status;
    if (status === 404) {
      return (
        <EmptyState
          icon={MessagesSquare}
          title="No interview questions yet"
          description="Set a career goal and upload your resume so we can generate tailored interview questions."
        />
      );
    }
    return <ErrorScreen description="We couldn't load interview questions." onRetry={refetch} />;
  }

  const questions = data?.questions || data || [];

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <EmptyState
        icon={MessagesSquare}
        title="No interview questions yet"
        description="Once your profile is set up, tailored interview questions will appear here."
      />
    );
  }

  const current = questions[index % questions.length];

  const handleNext = () => setIndex((i) => (i + 1) % questions.length);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      setIndex(0);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">Interview prep</h2>
          <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
            Practice with questions tailored to your target role.
          </p>
        </div>
        <Button variant="secondary" icon={RotateCw} loading={refreshing} onClick={handleRefresh}>
          Refresh questions
        </Button>
      </div>

      <div className="max-w-2xl">
        <QuestionCard question={current} index={index} total={questions.length} />
        <div className="flex justify-end mt-4">
          <Button icon={ArrowRight} onClick={handleNext}>
            Next question
          </Button>
        </div>
      </div>
    </div>
  );
}
