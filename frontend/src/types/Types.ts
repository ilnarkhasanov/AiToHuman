export type AppStatus =
  | "idle"
  | "loading-detect"
  | "loading-humanize"
  | "show-detect"
  | "show-humanize";

export interface ApiAnalysisResult {
  ai_rate: number;
  chunks: {
    text: string;
    ai_generated: boolean;
  }[];
}

export interface ApiHumanizerResult {
  previous_rate: number;
  new_rate: number;
  humanized_text: string;
}

export interface InternalAnalysisResult {
  score: number;
}

export interface InternalHumanizerResult {
  originalScore: number;
  humanizedScore: number;
  humanizedText: string;
}
