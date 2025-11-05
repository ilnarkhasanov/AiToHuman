import React from "react";
import type { AppStatus } from "../types/Types";

interface TextProcessorProps {
  status: AppStatus;
}

const TextProcessor: React.FC<TextProcessorProps> = ({ status }) => {
  const [text, setText] = React.useState("");
  const [wordCount, setWordCount] = React.useState(0);
  const isLoading =
    status === "loading-detect" || status === "loading-humanize";
  const MAX_WORDS = 500;
  const isOverLimit = wordCount > MAX_WORDS;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Text changed:", e.target.value);
    let newText = e.target.value;
    let words = newText.split(/\s+/).filter(Boolean);

    setText(newText);
    setWordCount(words.length);
  };

  return (
    <div>
      <label htmlFor="text-input" className="text-sm font-medium text-gray-700">
        Your Text
      </label>
      <textarea
        id="text-input"
        className={`w-full mx-auto h-64 mt-2 p-4 rounded-md border border-gray-200 focus:outline-none transition ${
          isOverLimit
            ? "border-red-500 ring-2 ring-red-300" // over limit border
            : "border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent" // default border
        }`}
        placeholder={`Enter text here (up to ${MAX_WORDS} words)...`}
        value={text}
        onChange={handleTextChange}
        disabled={isLoading}
      ></textarea>
      <div
        className={`text-right text-sm mt-2 ${
          isOverLimit ? "text-red-600" : "text-gray-500"
        }`}
      >
        {wordCount}/{MAX_WORDS} words
      </div>
    </div>
  );
};

export default TextProcessor;
