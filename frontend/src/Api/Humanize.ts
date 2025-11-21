import axios from "axios";
import type { ApiHumanizerResult } from "../types/Types";
import { USE_MOCK_API } from "./MockConfig";
import { mockHumanizeText } from "./mockData";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

/**
 * Calls the backend /humanize endpoint (or mock).
 * @param text the text to humanize
 * @returns the humanized text
 */
export const humanizeText = async (text: string): Promise<ApiHumanizerResult> => {
  // Mock API call
  if (USE_MOCK_API) {
    return mockHumanizeText(text);
  }

  const response = await axios.post(`${API_BASE_URL}/humanize`, {
    text: text,
  });

  return response.data;
};
