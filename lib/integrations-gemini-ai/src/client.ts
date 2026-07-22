import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "[@workspace/integrations-gemini-ai] WARNING: GEMINI_API_KEY is not set.",
  );
  console.warn(
    "[@workspace/integrations-gemini-ai] AI features will not work until you add your API key to .env",
  );
  console.warn(
    "[@workspace/integrations-gemini-ai] Get your key from: https://aistudio.google.com/app/apikey",
  );
}

// Google AI Studio now issues AQ... OAuth tokens in addition to the older
// AIza... API keys. AQ... tokens must be sent as "Authorization: Bearer"
// headers; passing them via apiKey sends them as "x-goog-api-key" which the
// API rejects. Detect the format and authenticate accordingly.
const isOAuthToken = apiKey?.startsWith("AQ");

export const ai = apiKey
  ? isOAuthToken
    ? new GoogleGenAI({
        apiKey: undefined,
        httpOptions: {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      })
    : new GoogleGenAI({ apiKey })
  : null;
