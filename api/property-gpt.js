// /api/property-gpt.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Vercel-safe
});

export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Missing property address" });
    }

    // ✅ GPT Prompt
    const prompt = `
Generate a structured property data report for the following address: ${address}.
Include:
- Summary of property characteristics
- Risk or insurance-related insights
- Key notes for underwriting or inspection
Return your response as JSON.
`;

    // ✅ Send request to OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a property data analyst generating structured, factual reports for insurers.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    // ✅ Extract response
    const gptOutput = completion.choices[0].message.content;

    // ✅ Send response back to browser
    res.status(200).json({
      address,
      report: gptOutput,
    });
  } catch (error) {
    console.error("❌ Error in property-gpt:", error);
    res.status(500).json({
      error: "Failed to generate report",
      details: error.message,
    });
  }
}