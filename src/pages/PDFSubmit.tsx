export default function PDFSubmit() {
  return (
    <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-6 py-20">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        Try the Property Data Finder Tool
      </h1>
      <p className="text-slate-600 max-w-2xl mb-8">
        Upload a sample property report below and explore the insights for free. 
        You can submit up to 3 trial reports.
      </p>

      <iframe
        src="https://ephoriax.kit.com/b0ab7abf0b"
        title="PDF Free Trial Form"
        className="w-full max-w-lg h-[600px] border-0 rounded-xl shadow-lg"
      ></iframe>
    </section>
  );
}