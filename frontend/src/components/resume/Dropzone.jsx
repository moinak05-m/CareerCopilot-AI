import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Dropzone({ onFile, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile, disabled]
  );

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      animate={{ scale: isDragging ? 1.01 : 1 }}
      className={cn(
        "rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-colors duration-200",
        isDragging
          ? "border-forest-500 bg-forest-50/60 dark:bg-forest-900/20"
          : "border-ink-200 dark:border-ink-700 hover:border-forest-400 bg-white dark:bg-ink-800",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      <div className="mx-auto h-14 w-14 rounded-2xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center mb-4 animate-floatY">
        {isDragging ? (
          <FileText className="h-7 w-7 text-forest-600 dark:text-forest-300" />
        ) : (
          <UploadCloud className="h-7 w-7 text-forest-600 dark:text-forest-300" />
        )}
      </div>
      <p className="font-display font-semibold text-ink-900 dark:text-paper-50">
        {isDragging ? "Drop your resume here" : "Drag & drop your resume"}
      </p>
      <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">
        or <span className="text-forest-600 dark:text-forest-300 font-medium">browse files</span> · PDF, DOC, DOCX up to 10MB
      </p>
    </motion.div>
  );
}
