import { Router } from "express";
const router = Router();
router.post("/", async (req, res) => {
    const { prompt } = req.body || {};
    if (!prompt) {
        return res.status(400).json({ error: "Missing prompt" });
    }
    try {
        console.log("Generating Property Report for:", prompt);
        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "OpenAI-Project": process.env.OPENAI_PROJECT_ID ?? "",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                input: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "input_text",
                                text: `
You are a professional property research assistant that uses the **OpenAI Property Data Finder tool** to locate, cross-reference, and summarize accurate, publicly available data for any U.S. property address.

Your process:
1. Search major public real estate databases such as Zillow, Redfin, Realtor.com, Trulia, County Assessor records, and other verified public listings.
2. Gather details including:
   - Year built
   - Square footage
   - Lot size
   - Bedrooms and bathrooms
   - Exterior type and materials
   - Amenities (pool, solar, garage, etc.)
   - Last sale price and market trends
3. Summarize this data in clear, client-ready language.

When ready, generate an AI-written report with these sections:
- **Overview**
- **Building Details**
- **Key Features**
- **Market Insights**
- **Conclusion**

The property address for this report is:
"${prompt}"

If certain information cannot be confirmed, note it transparently (e.g. "Exact square footage not publicly listed"). Never invent facts.

Always write in a clear, professional tone suitable for property clients.
`,
                            },
                        ],
                    },
                ],
                temperature: 0.7,
                max_output_tokens: 800,
            }),
        });
        const data = await response.json();
        console.log("OpenAI Raw Response:", JSON.stringify(data, null, 2));
        if (data?.output?.[0]?.content?.[0]?.text) {
            return res.status(200).json({ reply: data.output[0].content[0].text });
        }
        else {
            return res.status(200).json({ reply: "No response generated." });
        }
    }
    catch (error) {
        console.error("Error in GPT handler:", error);
        return res.status(500).json({ error: "Error connecting to GPT service." });
    }
});
export default router;
