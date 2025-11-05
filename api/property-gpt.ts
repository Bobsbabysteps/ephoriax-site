// Vercel serverless function configuration
export const config = {
  runtime: "nodejs",
  memory: 512,
  maxDuration: 30,
};

import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../src/lib/gptInstructions.js";

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Helper: Detect property type based on address keywords
function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle", "cove",
    "apt", "apartment", "unit #", "#", "residence", "home",
  ];

  const lowerAddress = address.toLowerCase();
  return residentialIndicators.some((word) => lowerAddress.includes(word))
    ? "Residential"
    : "Commercial";
}

// ✅ Main API route handler
export default async function handler(req: Request): Promise<Response> {
  try {
    // 🔹 Parse the incoming address
    const url = new URL(req.url, `https://${req.headers.get("host")}`);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const propertyType = detectPropertyType(address);

    // 🔹 Ask OpenAI for a structured property report
    const completionPromise = openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 200,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a real estate data assistant. Respond only with valid JSON containing concise, structured property insights.",
        },
        {
          role: "user",
          content: `Generate a short property insight summary for this ${propertyType} property at ${address}. Include: propertyType, generalInsights, and estimatedValue.`,
        },
      ],
    });

    // ⏱ Race against an 8-second timeout to avoid Vercel 504s
    const completion: any = await Promise.race([
      completionPromise,
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      error: "timeout",
                      message:
                        "The report took too long. Please try again shortly.",
                    }),
                  },
                },
              ],
            }),
          8000
        )
      ),
    ]);

    // 🔹 Extract and validate the response
    const reportText = completion?.choices?.[0]?.message?.content ?? "";
    let reportJson;

    try {
      reportJson = JSON.parse(reportText);
    } catch {
      reportJson = { error: "Invalid response format", raw: reportText };
    }

    // 🔹 Return the result as JSON
    return new Response(JSON.stringify({ report: reportJson }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("API error:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to generate property data report",
        message: err?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}