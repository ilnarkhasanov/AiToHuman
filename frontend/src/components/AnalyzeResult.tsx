import React from "react";
import { ArrowPathIcon, SparklesIcon } from "@heroicons/react/24/outline";
import type { InternalAnalysisResult } from "../types/Types";

const MAX_WORDS = 500;

interface AnalyzeResultProps {
    text: string;
    result: InternalAnalysisResult;
    onAnalyzeNew: () => void;
    onHumanizeExisting: () => void;
}

const AnalyzeResult: React.FC<AnalyzeResultProps> = ({
    text,
    result,
    onAnalyzeNew,
    onHumanizeExisting,
}) => {

    return (
        <div>
            <label className="text-sm font-medium text-gray-700">
                Your Text
            </label>
            {/* highlighting chunks */}
            <div className="mt-2 w-full h-64 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto whitespace-pre-wrap leading-relaxed cursor-default">
                {result.chunks && result.chunks.length > 0 ? (
                    result.chunks.map((chunk, index) => (
                        <span
                            key={index}
                            className={chunk.ai_generated ? 'bg-red-200 rounded-sm px-0.5' : ''}
                            title={chunk.ai_generated ? 'Detected as AI-Generated' : 'Human-Written'}
                        >
                            {chunk.text}
                        </span>
                    ))
                ) : (
                    // Fallback if no chunks are provided by the API
                    <p className="text-gray-600">
                        {text.split(/\s+/).filter(Boolean).slice(0, MAX_WORDS).join(' ')}
                    </p>
                )}
            </div>

            <div className="text-center mt-8">
                <div className="text-sm text-gray-600 mb-2">AI Detection Result</div>
                <div className="text-7xl font-bold text-red-500">{result.score}%</div>
                <div className="text-lg text-gray-700 font-medium mt-1">
                    Probability of AI
                </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
                <button
                    onClick={onAnalyzeNew}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                    <ArrowPathIcon className="w-5 h-5" />
                    Analyze New Text
                </button>
                <button
                    onClick={onHumanizeExisting}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                    <SparklesIcon className="w-5 h-5" />
                    Humanize Text
                </button>
            </div>
        </div>
    );
};

export default AnalyzeResult;

