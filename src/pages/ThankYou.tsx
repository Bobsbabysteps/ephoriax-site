export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        You’re In! 🎉
      </h1>

      <p className="text-slate-600 max-w-md">
        Thanks for requesting beta access to EphoriaX Property Data Finder Tool, Beta program.  
        Check your inbox for a confirmation email from us — it includes
        important next steps and a link back here when you’re ready
        to explore your dashboard.
      </p>

      <a
        href="/"
        className="mt-8 inline-block bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
      >
        Return Home
      </a>
    </div>
  );
}