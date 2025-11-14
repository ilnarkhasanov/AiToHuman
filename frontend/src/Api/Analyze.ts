import axios from "axios";
import type { ApiAnalysisResult } from "../types/Types";
import { USE_MOCK_API } from "./MockConfig";
import { mockAnalyzeText } from "./mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Calls the backend /analyze endpoint (or mock).
 * @param text The text to analyze
 * @returns The analysis result from the API
 */
export const analyzeText = async (text: string): Promise<ApiAnalysisResult> => {
  // Mock API call
  if (USE_MOCK_API) {
    return mockAnalyzeText(text);
  }

  const response = await axios.post(`${API_BASE_URL}/analyze`, {
    text: text,
  });

  return response.data;
};
