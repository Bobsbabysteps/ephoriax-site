// /api/property-gpt.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    // 🔍 Log environment status
    console.log("🔍 OpenAI API Key Exists:", !!process.env.OPENAI_API_KEY);

    const { address } = req.query;

    // 🛡 Safe guard against empty or missing address
    if (!address || address.trim().length === 0) {
      console.warn("⚠️ Missing or empty address received");
      return res.status(400).json({
        error: "Please provide a valid property address to generate a report.",
      });
    }

    console.log(`📍 Generating property report for: ${address}`);

    const prompt = `
Generate a structured property data report for the following address: ${address}.
Include:
- Summary of property characteristics
- Risk or insurance-related insights
- Key notes for underwriting or inspection
Return your response as JSON.
`;

    // ✳️ Send request to GPT
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a property data analyst generating structured, factual reports for insurers.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const gptOutput = completion.choices[0].message.content;

    console.log("✅ GPT response received successfully");

    // ✅ Send JSON response
    res.status(200).json({
      address,
      report: gptOutput,
    });
  } catch (error) {
    console.error("❌ Error in property-gpt:", error.response?.data || error.message || error);
    res.status(500).json({
      error: "Failed to generate report",
      details: error.response?.data || error.message || "Unknown error",
    });
  }
}