import React, { useRef, useState } from "react";
import { extractTextFromFile } from "../Api/FileOCR";

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
  onFileNameChange?: (fileName: string | null) => void;
  onError?: (error: string | null) => void;
  maxSizeMB?: number;
  disabled?: boolean;
}

const MAX_SIZE_MB = 2;
const TEXT_FILE_TYPE = "text/plain";
const TEXT_EXTENSIONS = [".txt"];
const OCR_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];
const OCR_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
const SUPPORTED_TYPES = [TEXT_FILE_TYPE, ...OCR_FILE_TYPES];

const getFileExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot !== -1 ? fileName.substring(lastDot).toLowerCase() : "";
};

const FileUpload: React.FC<FileUploadProps> = ({
  onTextExtracted,
  onFileNameChange,
  onError,
  maxSizeMB = MAX_SIZE_MB,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onError?.(null);
    onFileNameChange?.(null);
    if (!file) return;

    // Check file type (by MIME type and extension for robustness)
    const fileExtension = getFileExtension(file.name);
    const isValidByMimeType = SUPPORTED_TYPES.includes(file.type);
    const isValidByExtension =
      TEXT_EXTENSIONS.includes(fileExtension) ||
      OCR_EXTENSIONS.includes(fileExtension);

    if (!isValidByMimeType && !isValidByExtension) {
      onError?.("Only .txt, .pdf, .png, and .jpg files are supported");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      onError?.(`File too large (max ${maxSizeMB}MB)`);
      return;
    }
    setLoading(true);
    try {
      let extracted = "";
      const isTextFile =
        file.type === TEXT_FILE_TYPE || TEXT_EXTENSIONS.includes(fileExtension);
      const isOCRFile =
        OCR_FILE_TYPES.includes(file.type) ||
        OCR_EXTENSIONS.includes(fileExtension);

      if (isTextFile) {
        extracted = await file.text();
      } else if (isOCRFile) {
        console.log("extracting text OCR")
        extracted = await extractTextFromFile(file);
      } else {
        throw new Error("Unsupported file type");
      }
      onTextExtracted(extracted);
      onFileNameChange?.(file.name);
      onError?.(null); // Clear any previous errors on success
    } catch (err) {
      console.error("Error extracting text:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to extract text from file";
      onError?.(errorMessage);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        className={`
          relative cursor-pointer 
          bg-purple-100 hover:bg-purple-200 
          text-purple-700 text-[15px] font-semibold 
          py-1.5 px-6 rounded-lg shadow-sm transition-all flex items-center
          ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {loading ? (
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border-2 border-t-transparent border-purple-700 rounded-full animate-spin"></div>
            Loading File...
          </div>
        ) : (
          "Upload file"
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".txt,.pdf,.png,.jpg,.jpeg"
          className="sr-only"
          onChange={handleFileChange}
          disabled={loading || disabled}
        />
      </label>
      <div className="text-xs text-gray-500 mt-1 text-right">
        txt, pdf, png, jpg. Size limit: {maxSizeMB}MB
      </div>
    </div>
  );
};

export default FileUpload;
