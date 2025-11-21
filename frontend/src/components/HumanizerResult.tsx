import React, { useState } from "react";
import type { InternalHumanizerResult } from "../types/Types";

interface HumanizerResultProps {
    result: InternalHumanizerResult;
    onHumanizeNew: () => void;
}

const HumanizerResult: React.FC<HumanizerResultProps> = ({
    result,
    onHumanizeNew,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        try {
            const ta = document.createElement("textarea");
            ta.value = result.humanizedText;
            ta.style.position = "absolute";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);

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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>

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
                    <h3 className="text-lg font-semibold text-gray-800">
                        Humanized Text
                    </h3>
                    <button
                        onClick={handleCopy}
                        className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${copied
                            ? "text-green-600"
                            : "text-purple-600 hover:text-purple-800"
                            }`}
                    >
                        {copied ? "Copied!" : "Copy Text"}
                    </button>
                </div>
                <div className="w-full h-64 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {result.humanizedText}
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={onHumanizeNew}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                    Humanize New Text
                </button>
            </div>
        </div>
    );
};

export default HumanizerResult;

