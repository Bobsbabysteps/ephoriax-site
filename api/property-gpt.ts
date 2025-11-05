export default async function handler(req: Request): Promise<Response> {
  try {
    // Parse the request URL
    const url = new URL(req.url, `https://${req.headers.get("host")}`);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const propertyType = detectPropertyType(address);

    // 🔹 Define the OpenAI request
    const completionPromise = openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 200, // shorter for faster turnaround
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a real estate data assistant. Respond only with valid JSON containing brief property insights.",
        },
        {
          role: "user",
          content: `Generate a concise property insight summary for this ${propertyType} property: ${address}.`,
        },
      ],
    });

    // 🧠 Add timeout race to avoid 504 errors
    const completion: any = await Promise.race([
      completionPromise,
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      error: "timeout",
                      message:
                        "The report took too long. Please try again in a few seconds.",
                    }),
                  },
                },
              ],
            }),
          8000 // ⏱ 8 seconds fallback
        )
      ),
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