import { isAxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Extracts a user-friendly error message from an error object.
 * Handles Axios errors, validation errors, network errors, and generic errors.
 * 
 * @param err - The error object (can be any type)
 * @param defaultMessage - The default message to return if no specific error message can be extracted
 * @returns A user-friendly error message string
 */
export const extractErrorMessage = (err: any, defaultMessage: string): string => {
  let errorMsg: string;
  
  if (isAxiosError(err)) {
    if (err.response) {
      // Handle 422 Validation Error
      if (err.response.status === 422 && err.response.data.detail) {
        errorMsg =
          err.response.data.detail[0]?.msg ||
          "Validation Error: Please check your input.";
      } else {
        errorMsg =
          err.response.data?.detail ||
          err.response.data?.message ||
          err.message;
      }
    } else if (err.request) {
      // Network error (no response received)
      errorMsg = `Network Error: Could not connect to the server at ${API_BASE_URL}.`;
    } else {
      
      errorMsg = err.message;
    }
  } else {
    errorMsg = err.message || defaultMessage;
  }
  
  return errorMsg;
};

