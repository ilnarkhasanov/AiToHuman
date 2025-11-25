import React from "react";
import { ArrowPathIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { FiCornerDownLeft } from "react-icons/fi";
import type { InternalAnalysisResult } from "../types/Types";

const MAX_WORDS = 500;

interface AnalyzeResultProps {
  text: string;
  result: InternalAnalysisResult;
  onAnalyzeNew: () => void;
  onHumanizeExisting: () => void;
  onReturnHome: () => void;
}

const AnalyzeResult: React.FC<AnalyzeResultProps> = ({
  text,
  result,
  onAnalyzeNew,
  onHumanizeExisting,
  onReturnHome,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-2">
        <label className="text-base font-medium text-gray-700">Your Text</label>
        <button
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white hover:bg-purple-50 shadow-xs px-3 py-1 text-sm font-medium text-purple-600 transition"
        >
          <FiCornerDownLeft className="h-4 w-4" />
          Return
        </button>
      </div>
      {/* highlighting chunks */}
      <div className="mt-2 w-full h-64 p-4 border border-gray-200 rounded-md bg-white overflow-y-auto whitespace-pre-wrap leading-relaxed cursor-default">
        {result.chunks && result.chunks.length > 0 ? (
          result.chunks.map((chunk, index) => (
            <span
              key={index}
              className={
                chunk.ai_generated ? "bg-red-200 rounded-sm px-0.5" : ""
              }
              title={
                chunk.ai_generated
                  ? "Detected as AI-Generated"
                  : "Human-Written"
              }
            >
              {chunk.text}
            </span>
          ))
        ) : (
          // Fallback if no chunks are provided by the API
          <p className="text-gray-600">
            {text.split(/\s+/).filter(Boolean).slice(0, MAX_WORDS).join(" ")}
          </p>
        )}
      </div>

      <div className="text-center mt-8">
        <div className="text-sm text-gray-600 mb-2">AI Detection Result</div>
        <div className="text-5xl sm:text-7xl font-bold text-red-500">
          {result.score}%
        </div>
        <div className="text-base sm:text-lg text-gray-700 font-medium mt-1">
          Probability of AI
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <button
          onClick={onAnalyzeNew}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg flex justify-center items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Analyze New Text
        </button>
        <button
          onClick={onHumanizeExisting}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg flex justify-center items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <SparklesIcon className="w-5 h-5" />
          Humanize Text
        </button>
      </div>
    </div>
  );
};

export default AnalyzeResult;
