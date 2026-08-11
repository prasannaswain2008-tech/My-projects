import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
type ManualChunk = { manual: string; page: number; text: string };
const manualChunks: ManualChunk[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "manual_chunks.json"), "utf8"));
const words = (value: string) => (value.toLowerCase().match(/[a-z0-9]{2,}/g) || []);
const getResponseText = (result: any) => {
  if (typeof result?.output_text === "string" && result.output_text.trim()) {
    return result.output_text.trim();
  }

  return (Array.isArray(result?.output) ? result.output : [])
    .flatMap((item: any) => Array.isArray(item?.content) ? item.content : [])
    .filter((item: any) => item?.type === "output_text" && typeof item?.text === "string")
    .map((item: any) => item.text.trim())
    .filter(Boolean)
    .join("\n");
};
const findEvidence = (question: string) => {
  const terms = new Set(words(question));
  return manualChunks.map(chunk => {
    const body = words(chunk.text);
    const score = [...terms].reduce((sum, term) => sum + body.filter(word => word === term).length, 0) / Math.sqrt(body.length || 1);
    return { chunk, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 8).map(item => item.chunk);
};

// Native CORS headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

// Public manuals chatbot. Its knowledge stays on the server; the browser sees only the final answer.
app.post("/api/manuals/ask", async (req, res) => {
  try {
    const question = String(req.body?.question || "").trim();
    if (!question) return res.status(400).json({ error: "Please enter a question." });
    const evidence = findEvidence(question);
    if (!evidence.length) return res.json({ answer: "I could not find enough information in the loaded product guides to answer that. Please include the product name or ask a more specific question." });
    const prompt = `You are a product-manuals answer agent. Compare the evidence, reconcile it, and answer the visitor's question precisely. Use only evidence. Do not guess, cite, mention sources, page numbers, retrieval, or manuals. If the evidence is insufficient or contradictory, say so clearly.\n\nEVIDENCE:\n${evidence.map((item, index) => `[${index + 1}] ${item.text}`).join("\n\n")}\n\nQUESTION: ${question}`;
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST", headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.CHAT_MODEL || "gpt-4.1-mini", input: prompt })
    });
    if (!response.ok) throw new Error("The manuals assistant is temporarily unavailable.");
    const result: any = await response.json();
    return res.json({ answer: getResponseText(result) || "I could not generate an answer just now." });
  } catch (error: any) {
    console.error("Manuals Assistant Error:", error);
    return res.status(500).json({ error: "The manuals assistant is temporarily unavailable. Please try again shortly." });
  }
});

// Initialize Gemini Client safely on the server side
// Note: We use process.env.GEMINI_API_KEY and include 'aistudio-build' User-Agent for telemetry
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint for Virtual Technical Writing Assistant
app.post("/api/gemini/assist", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text content is required." });
    }

    const ai = getGeminiClient();

    let systemInstruction = `You are the Virtual Technical Writer Co-Pilot representing Prasanna Kumar Swain, a veteran Specialist Technical Writer with 10+ years of experience.
Your job is to assist with technical writing tasks using extreme precision, clarity, and professionalism.

The user has selected the mode: "${mode || "simplify"}".
Guidelines for the modes:
- "simplify" (Simplify Jargon): Rewrite dense technical, engineering, or developer jargon into clear, concise, active-voice, and user-centered language. Remove nominalizations and passive structures.
- "dita" (DITA Structurer): Reorganize unstructured technical notes into a structured DITA-format (Concept, Task, or Reference) represented in clean Markdown. For tasks, use clear step-by-step procedures, prerequisites, and expected outcomes.
- "apidoc" (API Doc Generator): Generate beautiful Markdown API reference documentation from raw inputs (JSON payloads, endpoints, params). Include query parameters, request body schemas, and response examples.

You MUST provide your response in JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: text,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedText: {
              type: Type.STRING,
              description: "The refined, improved documentation text in rich Markdown format.",
            },
            explanation: {
              type: Type.STRING,
              description: "A short bulleted list explaining the technical editing choices made (e.g. passive to active voice, structured as task, added prerequisite).",
            },
          },
          required: ["improvedText", "explanation"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini API.");
    }

    const parsedData = JSON.parse(responseText.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while communicating with the technical writer assistant.",
    });
  }
});

// Configure Vite integration
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Starting full-stack server in DEVELOPMENT mode with Vite HMR middleware.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Starting full-stack server in PRODUCTION mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
