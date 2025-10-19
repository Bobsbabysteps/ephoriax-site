import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    console.log("🛰️ Sending prompt to OpenAI:", prompt);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Project": process.env.OPENAI_PROJECT_ID!,
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-2024-07-18",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: prompt,
              },
              {
                type: "input_file",
                file_id: "file-CXew7agZen1NgJoB34e3uG",
},
            ],
          },
        ],
        tools: [
          {
            type: "file_search",
            vector_store_ids: ["vs_68f42da177a08191a71c5b863ac63847"], // EphoriaX Vector Store
          },
        ],
        temperature: 0.7,
        max_output_tokens: 1000,
      }),
    });

    const data = await response.json();

    // 🔍 Log full OpenAI response for debugging
    console.log("🧠 OpenAI Full Response:", JSON.stringify(data, null, 2));

    if (data?.output && Array.isArray(data.output)) {
      const message = data.output.find(
        (item: any) => item.type === "message" && item.content?.length
      );

      if (message) {
        const text = message.content
          .filter((c: any) => c.type === "output_text")
          .map((c: any) => c.text)
          .join("\n");
        return res.status(200).json({ reply: text });
      }
    }

    if (data?.output_text) {
      return res.status(200).json({ reply: data.output_text });
    }

    return res.status(200).json({ reply: "No response generated." });
  } catch (error: any) {
    console.error("🔥 OpenAI API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}