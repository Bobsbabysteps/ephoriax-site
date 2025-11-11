export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white text-center p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-4 animate-fadeIn">
        🎉 You’re In!
      </h1>

      {/* Subtext */}
      <p className="text-indigo-100 max-w-lg leading-relaxed mb-8">
        Thanks for joining the <span className="font-semibold">EphoriaX Beta Program</span> — 
        you’re officially on the inside.  
        <br />
        Check your inbox for a confirmation email with important details and 
        next steps on how to explore your tools and dashboard.
      </p>

      {/* Call-to-Action */}
      <a
        href="/"
        className="bg-white text-indigo-900 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-indigo-100 transition-all"
      >
        Return Home
      </a>

      {/* Optional Footer */}
      <footer className="mt-12 text-sm text-indigo-200 opacity-80">
        © {new Date().getFullYear()} EPHORIAX — All rights reserved.
      </footer>
    </div>
  );
}