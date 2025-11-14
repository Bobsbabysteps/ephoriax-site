import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "./gptInstructions.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Simple helper: detect property type from address keywords
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
    const { address, format } = req.query;

    if (!address || typeof address !== "string") {
      res.status(400).json({ error: "Missing address parameter" });
      return;
    }

    const propertyType = detectPropertyType(address);
    const prompt = PROPERTY_DATA_FINDER_INSTRUCTIONS.replace("{address}", address)
      .replace("{type}", propertyType);

    // Get summary data from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const data = completion.choices[0]?.message?.content ?? "No data generated.";

    // ✅ If format is JSON (default)
    if (!format || format !== "pdf") {
      res.status(200).json({
        address,
        propertyType,
        summary: data,
      });
      return;
    }

    // ✅ Otherwise, generate PDF using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const { width, height } = page.getSize();
    const margin = 50;
    const fontSize = 12;

    page.drawText("EphoriaX Property Report", {
      x: margin,
      y: height - 80,
      size: 18,
      font,
      color: rgb(0.2, 0.2, 0.8),
    });

    page.drawText(`Address: ${address}`, {
      x: margin,
      y: height - 120,
      size: fontSize,
      font,
    });

    page.drawText(`Property Type: ${propertyType}`, {
      x: margin,
      y: height - 140,
      size: fontSize,
      font,
    });

    page.drawText("Report Summary:", {
      x: margin,
      y: height - 170,
      size: 14,
      font,
    });

    // Wrap summary text neatly
    const words = data.split(" ");
    let textY = height - 190;
    let line = "";
    const maxWidth = 500;
    for (const word of words) {
      const testLine = line + word + " ";
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (lineWidth > maxWidth) {
        page.drawText(line.trim(), { x: margin, y: textY, size: fontSize, font });
        line = word + " ";
        textY -= 16;
      } else {
        line = testLine;
      }
    }
    if (line) page.drawText(line.trim(), { x: margin, y: textY, size: fontSize, font });

    // Send PDF as response
    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="Property_Report.pdf"`);
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}