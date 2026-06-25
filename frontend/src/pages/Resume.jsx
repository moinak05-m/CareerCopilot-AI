import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { resumeService } from "../services/resumeService";
import { useApi } from "../hooks/useApi";
import Dropzone from "../components/resume/Dropzone";
import UploadProgress from "../components/resume/UploadProgress";
import SuccessBadge from "../components/resume/SuccessBadge";
import ResumeSummaryCard from "../components/resume/ResumeSummaryCard";
import ExtractedSkills from "../components/resume/ExtractedSkills";
import PdfPreview from "../components/resume/PdfPreview";
import { SkeletonCard } from "../components/ui/Skeleton";
import ErrorScreen from "../components/ui/ErrorScreen";
import Button from "../components/ui/Button";

const MAX_SIZE_MB = 10;
const ACCEPTED = [".pdf", ".doc", ".docx"];

export default function Resume() {
  const fetcher = useCallback(() => resumeService.getResume(), []);
  const { data, loading, error, refetch, setData } = useApi(fetcher);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [justUploaded, setJustUploaded] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const handleFile = async (file) => {
    const ext = `.${file.name.split(".").pop().toLowerCase()}`;
    if (!ACCEPTED.includes(ext)) {
      toast.error("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File is too large. Max size is ${MAX_SIZE_MB}MB.`);
      return;
    }

    setPendingFile(file);
    setUploading(true);
    setProgress(0);
    setJustUploaded(false);

    try {
      const result = await resumeService.upload(file, setProgress);
      setData(result?.resume || result);
      setJustUploaded(true);
      toast.success("Resume uploaded and analyzed.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setPendingFile(null);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your resume?")) return;
    try {
      await resumeService.deleteResume();
      toast.success("Resume deleted successfully.");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete resume.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error && !data) {
    return <ErrorScreen description="We couldn't load your resume details." onRetry={refetch} />;
  }

  const resume = data?.resume || data;
  const hasResume = !!(resume && (resume.fileName || resume.name || resume.url));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">Resume</h2>
        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
          Upload your resume to power ATS scoring, skill gap analysis, and your roadmap.
        </p>
      </div>

      <Dropzone onFile={handleFile} disabled={uploading} />

      {uploading && pendingFile && <UploadProgress fileName={pendingFile.name} progress={progress} />}
      {justUploaded && <SuccessBadge />}

      {hasResume ? (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <ResumeSummaryCard resume={resume} onDelete={handleDelete} />
            <ExtractedSkills skills={resume.extractedSkills || resume.skills || []} />
          </div>
          <PdfPreview url={resume.url || resume.fileUrl} />
        </div>
      ) : (
        !uploading && (
          <div className="card text-center py-10">
            <p className="text-sm text-ink-500 dark:text-paper-300">
              No resume uploaded yet. Drop a file above to get started.
            </p>
            <Button variant="secondary" className="mt-4" onClick={refetch}>
              Refresh
            </Button>
          </div>
        )
      )}
    </div>
  );
}
