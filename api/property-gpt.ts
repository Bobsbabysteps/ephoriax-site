export const config = {
  runtime: 'nodejs', // ✅ correct current Vercel runtime identifier
  memory: 512,
  maxDuration: 30,
};

import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../src/lib/gptInstructions.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple, clear detection logic
function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle", "cove",
    "apt", "apartment", "unit #", "#", "residence", "home"
  ];

  const lowerAddress = address.toLowerCase();
  const isResidential = residentialIndicators.some(word =>
    lowerAddress.includes(word)
  );

  return isResidential ? "Residential" : "Commercial";
}

// ✅ Correct handler for Vercel Node API (no NextResponse)
export default async function handler(req: Request): Promise<Response | undefined> {
  // ✅ Works on both Node.js (object) and Fetch (Headers) types
  let host: string | null = null;

  if (req.headers?.get) {
    // Modern Fetch API (Edge, Web environments)
    host = req.headers.get("host");
  } else if (req.headers && typeof req.headers === "object") {
    // Node.js-style header object
    // 🧩 Node.js-style header object (e.g., Vercel's runtime)
    if (!("get" in req.headers)) {
      const nodeHeaders = req.headers as Record<string, string | string[] | undefined>;
      host =
        (Array.isArray(nodeHeaders["host"])
          ? nodeHeaders["host"][0]
          : nodeHeaders["host"]) || null;
    }

    host = host || "localhost:3000";
    // Ensure we always have an absolute base URL
    const url = req.url.startsWith("http")
      ? req.url
      : `https://${host}${req.url}`;
    const { searchParams } = new URL(url);
    const address = searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const propertyType = detectPropertyType(address);
      console.log(`🏠 Detected type: ${propertyType}`);

      const messages = [
        {
          role: "system" as const,
          content: PROPERTY_DATA_FINDER_INSTRUCTIONS,
        },
        {
          role: "user" as const,
          content: `${propertyType} ${address}\nGenerate a detailed property data report following the structured format defined in your system instructions.`,
        },
      ];

      const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini", // ✅ fast, cheap, supports JSON
  temperature: 0.6, // ✅ balanced tone
  max_tokens: 600, // ✅ shorter, avoids timeouts
  response_format: { type: "json_object" }, // ✅ ensures valid JSON output
  messages: [
    {
      role: "system",
      content:
        "You are a real estate data assistant. Always respond with a valid JSON object containing structured property insights.",
    },
    {
      role: "user",
      content: `Generate property insights for the following address: ${address}. Return only valid JSON.`,
    },
  ],
});
      const report = completion.choices[0]?.message?.content || "No report found.";

      return new Response(JSON.stringify({ report }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("API error:", err);
      return new Response(
        JSON.stringify({
          error: "Failed to generate property data report",
          message: err?.message || "Unknown error",
          type: err?.type || "Unknown type",
          stack: err?.stack || null,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ✅ This goes AFTER the catch block, as a final fallback:
    return new Response(
      JSON.stringify({ error: "Unexpected handler exit" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }