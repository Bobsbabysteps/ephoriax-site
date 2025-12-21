import { Router } from "express";
import OpenAI from "openai";
const router = Router();
const PROPERTY_DATA_FINDER_INSTRUCTIONS = `
You are a Property Data Analysis agent.

Your task:
When given an address, infer typical real estate characteristics using reasoning about U.S. suburban patterns,
zoning codes, and architectural eras.

Include:
- Estimated construction decade (e.g. "circa 1960s")
- Typical lot size range for the area (e.g. "6,000–8,000 sqft")
- Common zoning type (e.g. "R-1 residential")
- A short human-readable description of neighborhood style and appeal

Always respond in pure JSON, with the schema:
{
  "address": "...",
  "propertyType": "...",
  "details": {
    "yearBuilt": "...",
    "lotSize": "...",
    "zoning": "...",
    "description": "..."
  }
}
`;
function detectPropertyType(address) {
    const residentialIndicators = [
        "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
        "ct", "court", "trl", "trail", "pl", "place", "way", "circle",
        "apt", "apartment", "unit", "#", "residence", "home",
    ];
    const lower = address.toLowerCase();
    return residentialIndicators.some((w) => lower.includes(w))
        ? "Residential"
        : "Commercial";
}
router.get("/", async (req, res) => {
    try {
        const address = req.query.address;
        if (!address) {
            return res.status(400).json({ error: "Missing address" });
        }
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const propertyType = detectPropertyType(address);
        console.log("OpenAI key present?", !!process.env.OPENAI_API_KEY);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                temperature: 0.4,
                max_tokens: 150,
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: "system",
                        content: PROPERTY_DATA_FINDER_INSTRUCTIONS,
                    },
                    {
                        role: "user",
                        content: `Generate a concise ${propertyType} property data report for ${address}. Include all fields in JSON format.`,
                    },
                ],
            }, { signal: controller.signal });
            clearTimeout(timeout);
            const content = completion?.choices?.[0]?.message?.content ?? "{}";
            let parsed;
            try {
                parsed = JSON.parse(content);
            }
            catch {
                parsed = { error: "Invalid JSON returned", raw: content };
            }
            return res.json({ report: parsed });
        }
        catch (error) {
            clearTimeout(timeout);
            if (error.name === "AbortError") {
                return res.status(200).json({
                    error: "timeout",
                    message: "The OpenAI request took too long and was cancelled.",
                });
            }
            console.error("OpenAI error:", error);
            return res.status(500).json({
                error: "OpenAI call failed",
                message: error?.message || "Unknown error",
            });
        }
    }
    catch (err) {
        console.error("API error:", err);
        return res.status(500).json({
            error: "Failed to generate property data report",
            message: err?.message || "Unknown error",
        });
    }
});
export default router;
