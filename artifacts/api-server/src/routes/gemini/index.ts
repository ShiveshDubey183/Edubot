import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, conversations, messages } from "@workspace/db";
import {
  CreateGeminiConversationBody,
  SendGeminiMessageBody,
  GetGeminiConversationParams,
  DeleteGeminiConversationParams,
  ListGeminiMessagesParams,
  SendGeminiMessageParams,
} from "@workspace/api-zod";

const router = Router();

// ---------------------------------------------------------------------------
// Gemini REST API helpers — direct fetch, no SDK
// Supports:  AIza...  keys (query-param ?key=)
//            ya29...  OAuth2 access tokens (Authorization: Bearer)
//            AQ...    newer Google auth tokens (Authorization: Bearer)
// ---------------------------------------------------------------------------
const GEMINI_MODEL = "gemini-flash-lite-latest";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

function buildGeminiFetchArgs(path: string): { url: string; headers: Record<string, string> } {
  const apiKey = process.env.GEMINI_API_KEY ?? "";
  // AQ... and AIza... are both API key formats — pass as ?key= query param.
  // Only ya29... are OAuth2 access tokens that need Authorization: Bearer.
  const isOAuth = apiKey.startsWith("ya29.");

  const url = isOAuth
    ? `${GEMINI_BASE}/${path}`
    : `${GEMINI_BASE}/${path}?key=${encodeURIComponent(apiKey)}`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (isOAuth) headers["Authorization"] = `Bearer ${apiKey}`;

  return { url, headers };
}

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------
const STUDENT_SYSTEM_PROMPT = `You are EduBot, a helpful and knowledgeable AI assistant for college students in India. You specialize in providing accurate, clear, and supportive guidance on all college-related matters.

You can help students with:
- **Fees & Finance**: Fee structures, payment deadlines, scholarships, education loans, fee waivers, and financial aid
- **Admissions**: Admission procedures, eligibility criteria, required documents, entrance exams, merit lists, and counseling
- **Academics**: Subjects, syllabus, exam schedules, grading system, backlogs, re-examination procedures, and study tips
- **Faculty & Departments**: Department information, faculty contacts, office hours, and academic staff
- **Campus Life**: Hostel facilities, canteen, library, sports, clubs, events, and extracurricular activities
- **Documents & Certificates**: Bonafide certificate, transcripts, migration certificates, and other official documents
- **Placements & Internships**: Placement cell, internship opportunities, resume tips, and career guidance
- **Rules & Regulations**: College rules, attendance policies, code of conduct, and disciplinary procedures
- **Exams**: Exam timetables, hall tickets, result announcements, and revaluation processes
- **Generative AI & Technology**: Since you're a Gen AI project, you can also explain AI concepts, machine learning basics, and how tools like Gemini work

Always respond in a friendly, clear, and concise manner. If you don't know specific details about a particular institution, provide general guidance and suggest the student contact the relevant department directly. Respond in the same language the student uses (Hindi, English, or Hinglish).`;

// ---------------------------------------------------------------------------
// GET /gemini/health  — quick key validation
// ---------------------------------------------------------------------------
router.get("/health", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY ?? "";
    if (!apiKey) {
      res.status(500).json({ ok: false, error: "GEMINI_API_KEY is not set" });
      return;
    }

    // Use the non-streaming endpoint for a minimal test
    // AQ... and AIza... are API keys → ?key= query param
    // ya29... are OAuth2 access tokens → Authorization: Bearer
    const isOAuth = apiKey.startsWith("ya29.");
    const healthUrl = isOAuth
      ? `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent`
      : `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const healthHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (isOAuth) healthHeaders["Authorization"] = `Bearer ${apiKey}`;

    const resp = await fetch(healthUrl, {
      method: "POST",
      headers: healthHeaders,
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "Hi" }] }],
        generationConfig: { maxOutputTokens: 10 },
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      let msg = `HTTP ${resp.status}`;
      try {
        const parsed = JSON.parse(body);
        msg = parsed?.error?.message ?? parsed?.error ?? body;
        if (typeof msg === "object") msg = JSON.stringify(msg);
      } catch {}
      res.status(500).json({ ok: false, status: resp.status, error: msg });
      return;
    }

    res.json({ ok: true, model: GEMINI_MODEL });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? String(err) });
  }
});

// ---------------------------------------------------------------------------
// GET /gemini/conversations
// ---------------------------------------------------------------------------
router.get("/conversations", async (req, res) => {
  try {
    const allConversations = await db
      .select()
      .from(conversations)
      .orderBy(conversations.createdAt);
    res.json(allConversations.reverse());
  } catch (err) {
    req.log.error({ err }, "Failed to list conversations");
    res.status(500).json({ error: "Failed to list conversations" });
  }
});

// ---------------------------------------------------------------------------
// POST /gemini/conversations
// ---------------------------------------------------------------------------
router.post("/conversations", async (req, res) => {
  try {
    const parsed = CreateGeminiConversationBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const [conversation] = await db
      .insert(conversations)
      .values({ title: parsed.data.title })
      .returning();
    res.status(201).json(conversation);
  } catch (err) {
    req.log.error({ err }, "Failed to create conversation");
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

// ---------------------------------------------------------------------------
// GET /gemini/conversations/:id
// ---------------------------------------------------------------------------
router.get("/conversations/:id", async (req, res) => {
  try {
    const parsed = GetGeminiConversationParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid conversation id" });
      return;
    }
    const [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, parsed.data.id))
      .limit(1);
    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, parsed.data.id))
      .orderBy(messages.createdAt);
    res.json({ ...conversation, messages: msgs });
  } catch (err) {
    req.log.error({ err }, "Failed to get conversation");
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

// ---------------------------------------------------------------------------
// DELETE /gemini/conversations/:id
// ---------------------------------------------------------------------------
router.delete("/conversations/:id", async (req, res) => {
  try {
    const parsed = DeleteGeminiConversationParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid conversation id" });
      return;
    }
    const [deleted] = await db
      .delete(conversations)
      .where(eq(conversations.id, parsed.data.id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete conversation");
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

// ---------------------------------------------------------------------------
// GET /gemini/conversations/:id/messages
// ---------------------------------------------------------------------------
router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const parsed = ListGeminiMessagesParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid conversation id" });
      return;
    }
    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, parsed.data.id))
      .orderBy(messages.createdAt);
    res.json(msgs);
  } catch (err) {
    req.log.error({ err }, "Failed to list messages");
    res.status(500).json({ error: "Failed to list messages" });
  }
});

// ---------------------------------------------------------------------------
// POST /gemini/conversations/:id/messages  — SSE streaming via direct fetch
// ---------------------------------------------------------------------------
router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const paramsParsed = SendGeminiMessageParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "Invalid conversation id" });
      return;
    }
    const bodyParsed = SendGeminiMessageBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const conversationId = paramsParsed.data.id;
    const userContent = bodyParsed.data.content;

    // Verify conversation exists
    const [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);
    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    // Save user message
    await db.insert(messages).values({ conversationId, role: "user", content: userContent });

    // Load full history for multi-turn context
    const chatHistory = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);

    // Build Gemini REST request
    const apiKey = process.env.GEMINI_API_KEY ?? "";
    const isOAuth = apiKey.startsWith("ya29.");
    const streamUrl = isOAuth
      ? `${GEMINI_BASE}/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`
      : `${GEMINI_BASE}/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

    const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (isOAuth) fetchHeaders["Authorization"] = `Bearer ${apiKey}`;

    const geminiBody = {
      system_instruction: { parts: [{ text: STUDENT_SYSTEM_PROMPT }] },
      contents: chatHistory.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: 8192 },
    };

    const geminiResp = await fetch(streamUrl, {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify(geminiBody),
    });

    if (!geminiResp.ok || !geminiResp.body) {
      const errText = await geminiResp.text();
      let errMsg = `Gemini API error (HTTP ${geminiResp.status})`;
      try {
        const parsed = JSON.parse(errText);
        const inner = parsed?.error?.message;
        if (typeof inner === "string") {
          // inner may itself be JSON-encoded
          try { errMsg = JSON.parse(inner)?.error?.message ?? inner; } catch { errMsg = inner; }
        }
      } catch {}
      req.log.error({ status: geminiResp.status, errMsg }, "Gemini API call failed");
      if (!res.headersSent) {
        res.status(502).json({ error: errMsg });
      }
      return;
    }

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    let fullResponse = "";

    // Parse Gemini's SSE stream
    const reader = geminiResp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Split on SSE "data:" lines
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const jsonStr = trimmed.slice(5).trim();
        if (!jsonStr || jsonStr === "[DONE]") continue;
        try {
          const chunk = JSON.parse(jsonStr);
          const text: string =
            chunk?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (text) {
            fullResponse += text;
            res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
          }
        } catch {
          // skip malformed chunk
        }
      }
    }

    // Save assistant reply to DB
    if (fullResponse) {
      await db.insert(messages).values({
        conversationId,
        role: "assistant",
        content: fullResponse,
      });
    }

    // Auto-update conversation title from first message
    if (!conversation.title && userContent) {
      const shortTitle = userContent.slice(0, 60).trim();
      await db
        .update(conversations)
        .set({ title: shortTitle })
        .where(eq(conversations.id, conversationId));
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Failed to send message");
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to process message" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream error occurred" })}\n\n`);
      res.end();
    }
  }
});

export default router;
