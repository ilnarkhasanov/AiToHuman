import axios from "axios";
import type { ApiOCRResult } from "../types/Types";
import { USE_MOCK_API } from "./MockConfig";
import {mockExtractTextFromFile} from "./mockData"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

/**
 * Calls the backend /ocr endpoint to extract text from an image or PDF file.
 * @param file The file to process (PDF, PNG, or JPG)
 * @returns The extracted text from the OCR result
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  // Mock API call
  if (USE_MOCK_API) {
    return mockExtractTextFromFile(file);
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<ApiOCRResult>(
    `${API_BASE_URL}/ocr`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.text;
};



