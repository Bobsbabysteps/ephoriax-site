import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "./gptInstructions.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// 🏡 Detects property type by keywords in address
function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle",
    "apt", "apartment", "unit", "#", "residence", "home"
  ];
  const lower = address.toLowerCase();
  return residentialIndicators.some((w) => lower.includes(w))
    ? "Residential"
    : "Commercial";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("📄 PDF generation request received:", req.query);

    const { address, format } = req.query;

    if (!address || typeof address !== "string") {
      res.status(400).json({ error: "Missing or invalid address parameter" });
      return;
    }

    // Detect type locally
    const propertyType = detectPropertyType(address);

    // Generate summary via OpenAI
    const prompt = PROPERTY_DATA_FINDER_INSTRUCTIONS
      .replace("{address}", address)
      .replace("{type}", propertyType);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const data = completion.choices[0]?.message?.content ?? "No data generated.";

    // 🧾 Handle PDF export if requested
    if (format === "pdf") {
      console.log("🧾 Generating PDF output...");

      // Dynamic import for Vercel edge safety
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const { height } = page.getSize();

      const text = `
      Property Report
      ----------------------
      Address: ${address}
      Type: ${propertyType}

      Summary:
      ${data}
      `;

      page.drawText(text.trim(), {
        x: 50,
        y: height - 100,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        lineHeight: 16,
      });

      const pdfBytes = await pdfDoc.save();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=Property_Report.pdf");
      res.send(Buffer.from(pdfBytes));
      return;
    }

    // Default JSON response (for web app display)
    res.status(200).json({
      address,
      propertyType,
      summary: data,
    });
  } catch (error: any) {
    console.error("❌ PDF generation failed:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}