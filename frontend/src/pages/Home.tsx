import { useState, useCallback } from "react";
import TextProcessor from "../components/TextProcessor";
import { analyzeText } from "../Api/Analyze";
import { humanizeText } from "../Api/Humanize";
import { extractErrorMessage } from "../utils/errorHandler";
import type {
  AppStatus,
  InternalAnalysisResult,
  InternalHumanizerResult,
  ApiAnalysisResult,
  ApiHumanizerResult,
} from "../types/Types";

function Home() {
  const [status, setStatus] = useState<AppStatus>("idle");
  const [inputText, setInputText] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<InternalAnalysisResult | null>(null);
  const [humanizerResult, setHumanizerResult] =
    useState<InternalHumanizerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any, defaultMessage: string) => {
    const errorMsg = extractErrorMessage(err, defaultMessage);
    setError(errorMsg);
    setStatus("idle");
  };

  const handleAnalyze = useCallback(async (text: string) => {
    setStatus("loading-detect");
    setInputText(text);
    setAnalysisResult(null);
    setHumanizerResult(null);
    setError(null);

    try {
      const result: ApiAnalysisResult = await analyzeText(text);

      // Map API response to internal state
      setAnalysisResult({
        score: result.ai_rate,
        chunks: result.chunks,
      });
      setStatus("show-detect");
    } catch (err: any) {
      handleError(err, "Failed to analyze text.");
    }
  }, []);

  const handleHumanize = useCallback(async (text: string) => {
    setStatus("loading-humanize");
    setInputText(text); // Save the text
    setAnalysisResult(null);
    setHumanizerResult(null);
    setError(null); // Clear previous errors

    try {
      const result: ApiHumanizerResult = await humanizeText(text);

      // Map api response to internal state
      setHumanizerResult({
        originalScore: result.previous_rate,
        humanizedScore: result.new_rate,
        humanizedText: result.humanized_text,
      });
      setStatus("show-humanize");
    } catch (err: any) {
      handleError(err, "Failed to humanize text.");
    }
  }, []);

  // Handler to humanize text that has already been analyzed
  const handleHumanizeFromAnalysis = useCallback(() => {
    if (inputText) {
      handleHumanize(inputText);
    }
  }, [inputText, handleHumanize]);

  const handleReset = useCallback(() => {
    setStatus("idle");
    setInputText("");
    setAnalysisResult(null);
    setHumanizerResult(null);
    setError(null);
  }, []);

  return (
    <div id="page-background" className="bg-[#f6f8f7]">
      <main className="w-full max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl sm:text-4xl text-gray-800 pt-6 pb-4 font-lato font-extrabold">
          Detect and Humanize AI Text
        </h1>
        <p className="text-center text-xl text-gray-600 mb-8 font-lato">
          Paste your text below to analyze for AI-generated content and
          transform it to a human-like style.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <TextProcessor
            status={status}
            onAnalyze={handleAnalyze}
            onHumanize={handleHumanize}
            onHumanizeFromAnalysis={handleHumanizeFromAnalysis}
            analysisResult={analysisResult}
            humanizerResult={humanizerResult}
            onReset={handleReset}
            inputText={inputText}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
