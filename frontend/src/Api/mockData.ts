import type { ApiAnalysisResult, ApiHumanizerResult } from "../types/Types";

// --- MOCK API DATA ---
const MOCK_ANALYSIS_RESULT: ApiAnalysisResult = {
  ai_rate: 92,
  chunks: [
    {
      text: "The vast majority of scientific consensus indicates that global climate change is a direct result of anthropogenic activities. ",
      ai_generated: true,
    },
    {
      text: "We're talking about burning fossil fuels, deforestation, and industrial processes that release greenhouse gases like carbon dioxide and methane. ",
      ai_generated: false,
    },
    {
      text: "These gases trap heat in the atmosphere, leading to rising global temperatures, which has significant consequences for ecosystems and human civilization. ",
      ai_generated: true,
    },
    {
      text: "It's a serious problem, and we need to figure out solutions fast. ",
      ai_generated: true,
    },
    {
      text: "After that, we can try to find more effieicte solutions.",
      ai_generated: false,
    },
  ],
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
