export default async function handler(req: any, res: any) {
  // Restrict to POST requests only
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse JSON body safely
    const body = req.body || {};
    const prompt = body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Call the OpenAI Responses API with file reference
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        tools: [{ type: "file_search" }],
        input: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "file_reference",
                file_id: "file-Jbv2TXMDkvv4M8SQc187Pz", // Your uploaded instruction file
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    // Handle OpenAI API errors clearly
    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      return res
        .status(500)
        .json({ error: data.error?.message || "OpenAI request failed" });
    }

    // Safely extract the reply text
    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[0]?.content?.text ||
      data.output_text ||
      "No response generated.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}