import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "@/lib/gptInstructions";

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

  // If it matches a residential-style pattern → residential
  const isResidential = residentialIndicators.some(word =>
    lowerAddress.includes(word)
  );

  return isResidential ? "Residential" : "Commercial";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    const propertyType = detectPropertyType(address);
    console.log(`🏠 Detected type: ${propertyType}`);

    const messages = [
      {
        role: "system",
        content: PROPERTY_DATA_FINDER_INSTRUCTIONS,
      },
      {
        role: "user",
        content: `${propertyType} ${address}\nGenerate a detailed property data report following the structured format defined in your system instructions.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-turbo",
      temperature: 0.4,
      messages,
    });

    const report = completion.choices[0]?.message?.content || "No report found.";

    return NextResponse.json({ report });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Failed to generate property data report" },
      { status: 500 }
    );
  }
}