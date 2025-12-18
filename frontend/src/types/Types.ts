export type AppStatus =
  | "idle"
  | "loading-detect"
  | "loading-humanize"
  | "show-detect"
  | "show-humanize";

interface TextChunk {
  text: string;
  ai_generated: boolean;
}

export interface ApiAnalysisResult {
  ai_rate: number;
  chunks: TextChunk[];
}

export interface ApiHumanizerResult {
  previous_rate: number;
  new_rate: number;
  humanized_text: string;
}

export interface InternalAnalysisResult {
  score: number;
  chunks: TextChunk[];
}

export interface InternalHumanizerResult {
  originalScore: number;
  humanizedScore: number;
  humanizedText: string;
}

export interface ApiOCRResult {
  text: string;
}