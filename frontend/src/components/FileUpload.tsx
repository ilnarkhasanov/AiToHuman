import React, { useRef, useState } from "react";
import pdfToText from "react-pdftotext";

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
  onFileNameChange?: (fileName: string | null) => void;
  maxSizeMB?: number;
  disabled?: boolean;
}

const MAX_SIZE_MB = 2;
const SUPPORTED_TYPES = ["text/plain", "application/pdf"];

const FileUpload: React.FC<FileUploadProps> = ({
  onTextExtracted,
  onFileNameChange,
  maxSizeMB = MAX_SIZE_MB,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setError(null);
    onFileNameChange?.(null);
    if (!file) return;

    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError("Only .txt and .pdf files are supported");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large (max ${maxSizeMB}MB)`);
      return;
    }
    setLoading(true);
    try {
      let extracted = "";
      if (file.type === "text/plain") {
        extracted = await file.text();
      } else if (file.type === "application/pdf") {
        extracted = await pdfToText(file);
      }
      onTextExtracted(extracted);
      onFileNameChange?.(file.name);
    } catch (err) {
      setError("Failed to extract text");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <label
          className={`
          relative cursor-pointer 
          bg-purple-100 hover:bg-purple-200 
          text-purple-700 text-base font-semibold 
          py-2 px-4 rounded-lg shadow-sm transition-all flex items-center
          ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 border-2 border-t-transparent border-purple-700 rounded-full animate-spin"></div>
              Loading File...
            </div>
          ) : (
            "Upload File"
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".txt, .pdf"
            className="sr-only"
            onChange={handleFileChange}
            disabled={loading || disabled}
          />
        </label>
        <div className="text-xs text-gray-500 mt-1 text-right">
          txt, pdf. Size limit: {maxSizeMB}MB
        </div>
        {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}

      </div>
    </div>
  );
};

export default FileUpload;
