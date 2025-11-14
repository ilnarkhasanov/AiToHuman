import type { ApiAnalysisResult, ApiHumanizerResult } from "../types/Types";

// --- MOCK API DATA ---
export const MOCK_ANALYSIS_RESULT: ApiAnalysisResult = {
  ai_rate: 92,
  chunks: [], // Chunks are not used now
};

export const MOCK_HUMANIZER_RESULT: ApiHumanizerResult = {
  previous_rate: 92,
  new_rate: 15,
  humanized_text: `The core principles of neoclassical economic thought revolve around the assumption of rational actors seeking to maximize utility (consumers) or profit (firms). This framework relies heavily on mathematical modeling and equilibrium analysis, positing that markets, when left unregulated, naturally trend toward an optimal allocation of resources. Critics often point to its reliance on *ceteris paribus* assumptions, arguing that it fails to adequately account for real-world complexities like information asymmetry, behavioral biases, and significant externalities. Furthermore, the dedication to marginal analysis can sometimes obscure broader, systemic issues within economic structures.`,
};

/**
 * MOCK: Simulates the /analyze endpoint delay.
 */
export const mockAnalyzeText = (text: string): Promise<ApiAnalysisResult> => {
  console.log(
    `[MOCK API] Simulating analysis for: "${text.substring(0, 30)}..."`
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ANALYSIS_RESULT);
    }, 1500); // 1.5 second delay
  });
};

/**
 * MOCK: Simulates the /humanize endpoint delay.
 */
export const mockHumanizeText = (text: string): Promise<ApiHumanizerResult> => {
  console.log(
    `[MOCK API] Simulating humanization for: "${text.substring(0, 30)}..."`
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_HUMANIZER_RESULT);
    }, 2000); // 2 second delay
  });
};

