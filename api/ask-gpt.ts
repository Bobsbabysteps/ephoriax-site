import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  try {console.log("🔍 Environment key loaded:", !!process.env.OPENAI_API_KEY);
    // 1️⃣ Get the user's prompt from the request body
    const { prompt } = req.body;

    // 2️⃣ Call OpenAI’s GPT model using your API key from .env
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt || "Test connection" }],
  }),
});

if (!response.ok) {
  const err = await response.text();
  console.error("GPT API error:", err);
  throw new Error(`OpenAI API returned ${response.status}`);
}

    // 3️⃣ Parse and return the GPT reply
    const data = await response.json();
    res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(
  JSON.stringify({
    reply: data.choices?.[0]?.message?.content || "No response from GPT.",
  })
);

  } catch (error) {
  console.error("GPT API Error:", error);
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Error calling GPT API" }));
}
}