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
export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
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
      model: "gpt-4.1-turbo",
      temperature: 0.4,
      messages,
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
        type: err?.type || null,
        stack: err?.stack || null,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} // 👈 this one closes the `handler` function