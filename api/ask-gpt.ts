import type { VercelRequest, VercelResponse } from "@vercel/node";
export const config = {
  runtime: "nodejs",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    console.log("🧠 Generating sample Property Report for:", prompt);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Project": process.env.OPENAI_PROJECT_ID ?? "",
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-2024-07-18",
        reasoning: { effort: "medium" },
        temperature: 0.8,
        max_output_tokens: 1200,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_file",
                file_id: "file-CXew7agZen1NgJoB34e3uG",
              },
              {
                type: "input_text",
                text: `You are a professional property report generator for the EphoriaX Free Tool.
Use the uploaded PDF instructions as a guide for structure and tone.

Generate a realistic, fact-based *sample* Property Data Finder Report for the address: ${prompt}.
You may infer reasonable property characteristics (year built, materials, lot size, etc.)
based on regional building trends and typical local styles.

Always include these sections:
1. Property Overview
2. Building Details
3. Notable Features
4. Risk / Hazard Observations
5. Emergency Services Proximity
6. Disclaimer

Under the “Disclaimer” section, add this line:
“This sample report is generated using AI and regional property trends. It is for demonstration purposes only and does not reflect verified property data.”`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("🧩 OpenAI Raw Response:", JSON.stringify(data, null, 2));

    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[1]?.content?.[0]?.text ||
      "No response generated.";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("❌ Error in ask-gpt API:", error);
    return res.status(500).json({
      error: error.message || "Error connecting to GPT service",
    });
  }
}