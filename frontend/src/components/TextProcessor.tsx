import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type {
  AppStatus,
  InternalAnalysisResult,
  InternalHumanizerResult,
} from "../types/Types";
import AnalyzeResult from "./AnalyzeResult";
import HumanizerResult from "./HumanizerResult";
import FileUpload from "./FileUpload";

const MAX_WORDS = 500;
const LOCAL_STORAGE_KEY = "aitext_input_text";

interface TextProcessorProps {
  status: AppStatus;
  onAnalyze: (text: string) => void;
  onHumanize: (text: string) => void;
  onHumanizeFromAnalysis: () => void;
  analysisResult: InternalAnalysisResult | null;
  humanizerResult: InternalHumanizerResult | null;
  onReset: () => void;
  inputText: string;
  error: string | null;
}

const TextProcessor: React.FC<TextProcessorProps> = ({
  status,
  onAnalyze,
  onHumanize,
  onHumanizeFromAnalysis,
  analysisResult,
  humanizerResult,
  onReset,
  inputText,
  error,
}) => {
  // Load text from localStorage on mount
  const [text, setText] = useState(() => {
    try {
      const savedText = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedText || "";
    } catch {
      return "";
    }
  });

  const [wordCount, setWordCount] = useState(() => {
    try {
      const savedText = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedText) {
        const words = savedText.split(/\s+/).filter(Boolean);
        return words.length;
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Save text to localStorage whenever it changes
  useEffect(() => {
    try {
      if (text) {
        localStorage.setItem(LOCAL_STORAGE_KEY, text);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (error) {
      console.warn("Failed to save text to localStorage:", error);
    }
  }, [text]);

  const isLoading =
    status === "loading-detect" || status === "loading-humanize";

  const isOverLimit = wordCount > MAX_WORDS;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    const words = newText.split(/\s+/).filter(Boolean);

    setWordCount(words.length);
    setText(newText);
  };

  const handleAnalyzeClick = () => {
    onAnalyze(text);
  };

  const handleHumanizeClick = () => {
    onHumanize(text);
  };

  const handleFileExtracted = (fileText: string) => {
    setText(fileText);
    const words = fileText.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const HandleReset = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }

    // Clears old text after processing
    setText("");
    setWordCount(0);

    onReset();
  };

  const renderIdleState = () => (
    <div>
      <div className="flex gap-4 items-center justify-between">
        <label
          htmlFor="text-input"
          className="text-lg font-medium text-gray-700 py-2"
        >
          Type your text
        </label>
        <div className="flex items-center gap-4 w-full max-w-sm">
          <span className="flex-1 border-t border-gray-300"></span>
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <span className="flex-1 border-t border-gray-300"></span>
        </div>
        <FileUpload
          onTextExtracted={handleFileExtracted}
          onFileNameChange={setUploadedFileName}
          maxSizeMB={2}
          disabled={isLoading}
        />
      </div>
      <div className="relative">
        <textarea
          id="text-input"
          className={`
          mt-2 w-full h-72 p-4 border rounded-md transition focus:outline-none bg-gray-50
          ${
            isOverLimit
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          }
          ${error ? "border-red-500" : ""}
        `}
          placeholder={`Enter text here (up to ${MAX_WORDS} words)...`}
          value={text}
          onChange={handleTextChange}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-row justify-between mt-2 items-center gap-2">
        {uploadedFileName && (
          <div className="min-w-0 flex flex-row items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold py-1.5 px-3 rounded-lg">
            <InformationCircleIcon className="min-w-4 w-4 h-4" />
            <span className="truncate" title={uploadedFileName}>
              {uploadedFileName}
            </span>
          </div>
        )}
        <div className="grow" />
        <div
          className={`shrink-0 text-sm ${
            isOverLimit ? "text-red-600" : "text-gray-500"
          }`}
        >
          {wordCount}/{MAX_WORDS} words
        </div>
      </div>

      {/* Display API Error Message */}
      {error && (
        <div className="text-left text-sm text-red-600 mt-2 p-3 bg-red-50 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-4">
        <button
          onClick={handleAnalyzeClick}
          // Disable button if over limit or empty
          disabled={isLoading || !text.trim() || isOverLimit}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          {status === "loading-detect" ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <MagnifyingGlassIcon className="w-5 h-5" />
          )}
          {status === "loading-detect" ? "Analyzing..." : "Analyze"}
        </button>
        <button
          onClick={handleHumanizeClick}
          // Disable button if over limit or empty
          disabled={isLoading || !text.trim() || isOverLimit}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          {status === "loading-humanize" ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <SparklesIcon className="w-5 h-5" />
          )}
          {status === "loading-humanize" ? "Humanizing..." : "Humanize"}
        </button>
      </div>
    </div>
  );

  // Renders the correct view based on the application's status
  const renderContent = () => {
    switch (status) {
      case "show-detect":
        if (analysisResult) {
          return (
            <AnalyzeResult
              text={inputText}
              result={analysisResult}
              onAnalyzeNew={HandleReset}
              onHumanizeExisting={onHumanizeFromAnalysis}
            />
          );
        }
        return renderIdleState(); // Fallback

      case "show-humanize":
        if (humanizerResult) {
          return (
            <HumanizerResult
              result={humanizerResult}
              onHumanizeNew={HandleReset}
            />
          );
        }
        return renderIdleState(); // Fallback

      case "idle":
      case "loading-detect":
      case "loading-humanize":
      default:
        return renderIdleState();
    }
  };

  return <div>{renderContent()}</div>;
};

export default TextProcessor;
