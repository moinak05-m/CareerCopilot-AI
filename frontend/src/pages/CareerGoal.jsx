import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Crosshair, Save, CalendarClock } from "lucide-react";
import { careerGoalService } from "../services/careerGoalService";
import { useApi } from "../hooks/useApi";
import Button from "../components/ui/Button";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";

const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
  "UI/UX Designer",
  "Machine Learning Engineer",
  "QA Engineer",
  "Other",
];

const TIMELINE_OPTIONS = ["1 month", "3 months", "6 months", "1 year"];

export default function CareerGoal() {
  const fetcher = useCallback(() => careerGoalService.getGoal(), []);
  const { data, loading, error, refetch } = useApi(fetcher);

  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const goal = data?.goal || data;

    if (goal) {
      const goalTitle =
        goal.targetRole ||
        goal.title ||
        goal.role ||
        "";

      if (ROLE_OPTIONS.includes(goalTitle)) {
        setRole(goalTitle);
      } else if (goalTitle) {
        setRole("Other");
        setCustomRole(goalTitle);
      }

      if (goal.timeline) {
        setTimeline(goal.timeline);
      }
    }
  }, [data]);

  if (loading) return <SkeletonCard />;

  if (error)
    return (
      <ErrorScreen
        description="We couldn't load your career goal."
        onRetry={refetch}
      />
    );

  const currentGoal = data?.goal || data;

  const finalRole =
    role === "Other"
      ? customRole.trim()
      : role;

  const handleSave = async (e) => {
    e.preventDefault();

    if (!finalRole) {
      toast.error("Choose or enter a target role.");
      return;
    }

    setSaving(true);

    try {
      await careerGoalService.saveGoal({
        targetRole: finalRole,
        timeline,
      });

      toast.success("Career goal saved.");

      refetch();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Couldn't save your goal."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">
          Career Goal
        </h2>

        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
          Tell us the role you're aiming for — it drives your ATS scoring,
          skill gap, and roadmap.
        </p>
      </div>

      {currentGoal &&
        (currentGoal.targetRole ||
          currentGoal.title ||
          currentGoal.role) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center shrink-0">
              <Crosshair className="h-5.5 w-5.5 text-forest-600 dark:text-forest-300" />
            </div>

            <div>
              <p className="label-text">Current Goal</p>

              <p className="font-display font-semibold text-lg text-ink-900 dark:text-paper-50">
                {currentGoal.targetRole ||
                  currentGoal.title ||
                  currentGoal.role}
              </p>

              {currentGoal.timeline && (
                <p className="text-xs text-ink-500 dark:text-paper-300 flex items-center gap-1 mt-1">
                  <CalendarClock className="h-3 w-3" />
                  Target: {currentGoal.timeline}
                </p>
              )}
            </div>
          </motion.div>
        )}

      <form
        onSubmit={handleSave}
        className="card max-w-xl space-y-5"
      >
        <div>
          <label className="label-text">
            Target Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field mt-1.5"
          >
            <option value="" disabled>
              Select a role
            </option>

            {ROLE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {role === "Other" && (
          <div>
            <label className="label-text">
              Specify Role
            </label>

            <input
              className="input-field mt-1.5"
              placeholder="e.g. Cloud Security Engineer"
              value={customRole}
              onChange={(e) =>
                setCustomRole(e.target.value)
              }
            />
          </div>
        )}

        <div>
          <label className="label-text">
            Timeline
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
            {TIMELINE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTimeline(opt)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                  timeline === opt
                    ? "border-forest-500 bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-300"
                    : "border-ink-200 dark:border-ink-700 text-ink-600 dark:text-paper-300 hover:border-forest-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          loading={saving}
          icon={Save}
          className="w-full sm:w-auto"
        >
          {currentGoal?.targetRole ||
          currentGoal?.title ||
          currentGoal?.role
            ? "Update Goal"
            : "Save Goal"}
        </Button>
      </form>
    </div>
  );
}