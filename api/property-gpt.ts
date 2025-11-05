export const config = {
  runtime: "nodejs",
  memory: 512,
  maxDuration: 30,
};

import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../src/lib/gptInstructions.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle", "cove",
    "apt", "apartment", "unit #", "#", "residence", "home"
  ];

  const lowerAddress = address.toLowerCase();
  return residentialIndicators.some(w => lowerAddress.includes(w))
    ? "Residential"
    : "Commercial";
}

export default async function handler(req: Request): Promise<Response> {
  try {
    // Parse the request
    const url = new URL(req.url, `https://${req.headers.get("host")}`);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const propertyType = detectPropertyType(address);

    const completionPromise = openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 300,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a real estate data assistant. Always respond with a valid JSON object containing structured property insights.",
        },
        {
          role: "user",
          content: `Generate a concise property insight summary for: ${propertyType} property at ${address}. Only return valid JSON.`,
        },
      ],
    });

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    error: "timeout",
                    message:
                      "The request took too long. Please try again later.",
                  }),
                },
              },
            ],
          }),
        25000
      )
    );

    const completion: any = await Promise.race([
      completionPromise,
      timeoutPromise,
    ]);

    let reportText = completion?.choices?.[0]?.message?.content;

    // ✅ Guarantee valid JSON format
    let json;
    try {
      json = JSON.parse(reportText);
    } catch {
      json = { error: "Invalid response format", raw: reportText };
    }

    return new Response(JSON.stringify({ report: json }), {
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