import React, { useState } from "react";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import type {
  AppStatus,
  InternalAnalysisResult,
  InternalHumanizerResult
} from "../types/Types";
import AnalyzeResult from "./AnalyzeResult";
import HumanizerResult from "./HumanizerResult";

const MAX_WORDS = 500;

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
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

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

  // Renders the main input area
  const renderIdleState = () => (
    <div>
      <label htmlFor="text-input" className="text-sm font-medium text-gray-700">
        Your Text
      </label>
      <textarea
        id="text-input"
        className={`
          mt-2 w-full h-64 p-4 border rounded-md transition focus:outline-none
          ${isOverLimit
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
      {/* Conditional class for word count color */}
      <div
        className={`text-right text-sm mt-2 ${isOverLimit ? "text-red-600" : "text-gray-500"
          }`}
      >
        {wordCount}/{MAX_WORDS} words
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
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
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
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
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
              onAnalyzeNew={onReset}
              onHumanizeExisting={onHumanizeFromAnalysis}
            />
          );
        }
        return renderIdleState(); // Fallback

      case "show-humanize":
        if (humanizerResult) {
          return (
            <HumanizerResult result={humanizerResult} onHumanizeNew={onReset} />
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

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default TextProcessor;
