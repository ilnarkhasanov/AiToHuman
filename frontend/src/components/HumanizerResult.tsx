import React, { useState } from "react";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import type { InternalHumanizerResult } from "../types/Types";
import { MdCopyAll } from "react-icons/md";

interface HumanizerResultProps {
  result: InternalHumanizerResult;
  onHumanizeNew: () => void;
}

const HumanizerResult: React.FC<HumanizerResultProps> = ({
  result,
  onHumanizeNew,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.humanizedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div>
      {/* "Was" vs "Now" Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-around items-center">
          {/* Was */}
          <div className="text-center">
            <div className="text-sm text-gray-500">Was</div>
            <div className="text-5xl font-bold text-red-500 mt-1">
              {result.originalScore}%
            </div>
            <div className="text-gray-600">AI Likelihood</div>
          </div>

          {/* Arrow */}
          <ArrowRightIcon className="w-8 h-8 text-gray-400" />

          {/* Now */}
          <div className="text-center">
            <div className="text-sm text-gray-500">Now</div>
            <div className="text-5xl font-bold text-green-500 mt-1">
              {result.humanizedScore}%
            </div>
            <div className="text-gray-600">AI Likelihood</div>
          </div>
        </div>
      </div>

      {/* Humanized Text Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-gray-800">
            Humanized Text
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <button
              onClick={handleCopy}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                copied
                  ? "text-green-600"
                  : "text-purple-600 hover:text-purple-800"
              }`}
            >
              <MdCopyAll className="text-current transition-colors" />
              {copied ? "Copied!" : "Copy Text"}
            </button>
          </div>
        </div>
        <div className="w-full h-56 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto whitespace-pre-wrap leading-relaxed">
          {result.humanizedText}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onHumanizeNew}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <SparklesIcon className="w-5 h-5" />
          Humanize New Text
        </button>
      </div>
    </div>
  );
};

export default HumanizerResult;
