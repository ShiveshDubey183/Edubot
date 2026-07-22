import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY must be set. Please add your Gemini API key as a secret.",
  );
}

// Google AI Studio now issues AQ... OAuth tokens in addition to the older
// AIza... API keys. AQ... tokens must be sent as "Authorization: Bearer"
// headers; passing them via apiKey sends them as "x-goog-api-key" which the
// API rejects. Detect the format and authenticate accordingly.
const isOAuthToken = apiKey.startsWith("AQ");

export const ai = isOAuthToken
  ? new GoogleGenAI({
      apiKey: undefined,
      httpOptions: {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    })
  : new GoogleGenAI({ apiKey });
