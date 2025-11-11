// Property Data Finder Instructions
// Version 1.0 — extracted from "Property-Data-Finder-Instructions.txt"
// Note: ATTOM data integration optional (pending n8n pipeline)

export const PROPERTY_DATA_FINDER_INSTRUCTIONS = `
🏠 **Property Data Finder — Operational Instructions**

### Overview
Property Data Finder specializes in retrieving and synthesizing real property information from various authoritative sources. 
When given a property address, it performs a general data-gathering workflow using parcel, GIS, and supplemental records. 
If ATTOM data is available, it should be prioritized as the first data block.

---

### Submission Structure
Always label each data source block clearly with uppercase headers:

**ATTOM DATA (optional):**
<raw text or JSON export>

**PARCEL DATA:**
<APN details, assessor notes, legal description>

**GIS DATA:**
<lot boundaries, zoning, flood, or overlay data>

**SUPPLEMENTAL NOTES:**
<manual notes, field observations, or corrections>

This structure ensures clean validation, easy conflict resolution, and transparent merging of authoritative sources.

---

### Source Integrity
- Copy each data block exactly as exported — no reformatting or abbreviations.
- Preserve line breaks and headers.
- Include date stamps for each source.
- Prefer text or CSV; avoid screenshots or PDFs.

---

### Order of Submission
1. ATTOM Data (if available)
2. Assessor / Parcel Data
3. GIS / Mapping Data
4. Supplemental Notes / Field Data

---

### “Hold Updates” Workflow
After submitting each section, use:
**"Hold updates — additional data incoming."**
Once all data is submitted, finalize with:
**"Green light — compile full property report."**

At that point, the system merges all sources, resolves conflicts, and generates a unified report.

---

### Review & Integration Summary
After synthesis, the report includes:
- Total sources merged
- Conflicts detected/resolved
- Data completeness indicator (optional)

---

### Best Practices
- Prefer plain text, CSV, or JSON exports.
- Use full field labels (e.g., "Year Built" not "Yr Blt").
- Include full parcel numbers (APNs).
- Mark missing data as "N/A" or "Est."
- For multiple properties, separate with double line breaks.

---

### Integration Guidance
This instruction set is used by the PDF Data Intake Tool and related interfaces to guide users and validate incoming data. 
ATTOM data references remain in place for future integration via n8n.
`;