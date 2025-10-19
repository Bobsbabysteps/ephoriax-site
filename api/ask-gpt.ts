import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt in request body" });
    }

    console.log("📨 Sending request to OpenAI with prompt:", prompt);

    const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
  "OpenAI-Project": process.env.OPENAI_PROJECT_ID!,
  "OpenAI-Beta": "assistants=v2",
},
  body: JSON.stringify({
    model: "gpt-4o-mini",
    tools: [
      {
        type: "file_search",
        vector_store_ids: ["vs_68f42da177a08191a71c5b863ac63847"],
      },
    ],
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          {
            type: "input_file",
            file_id: "file-Jbv2TXMDkvv4M8SQc187Pz", // your uploaded instruction file
          },
        ],
      },
    ],
  }),
});

    const data = await response.json();

    // Log detailed error if OpenAI returns an error object
    if (!response.ok) {
      console.error("❌ OpenAI API Error:", JSON.stringify(data, null, 2));
      return res
        .status(500)
        .json({ error: data.error?.message || "OpenAI request failed" });
    }

    // Safely extract text from structured response
    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[0]?.content?.text ||
      data.output_text ||
      "No response generated.";

    console.log("✅ GPT Reply:", reply.slice(0, 200)); // preview up to 200 chars
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("🔥 Server Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
