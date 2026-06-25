import { FileWarning } from "lucide-react";

export default function PdfPreview({ url }) {
  if (!url) {
    return (
      <div className="card flex flex-col items-center justify-center py-10 text-center">
        <FileWarning className="h-8 w-8 text-ink-300 mb-2" />
        <p className="text-sm text-ink-400">No preview available for this file.</p>
      </div>
    );
  }
  return (
    <div className="card p-0 overflow-hidden">
      <iframe title="Resume preview" src={url} className="w-full h-[480px] rounded-2xl" />
    </div>
  );
}
