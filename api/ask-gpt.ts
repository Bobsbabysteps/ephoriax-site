export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = await req.json();

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
                file_id: "file-Jbv2TXMDkvv4M8SQc187Pz", // <--- your uploaded instruction file
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      return res.status(500).json({ error: data.error || "Failed to fetch response" });
    }

    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[0]?.content?.text ||
      "No response generated.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}