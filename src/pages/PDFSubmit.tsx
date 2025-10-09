import { useState } from "react";

export default function PDFSubmit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    city: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // Replace this with your actual Google Apps Script URL
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzc7tM9mw4WH_zo7lnRybve3P7mVclQsgM5Q3v2AlTByxZtdJVaMymWGC2UC5OJGMJPlQ/exec"// <-- paste your real endpoint here

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", businessType: "", city: "" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          EphoriaX Beta Tester Enrollment
        </h1>
<div className="mt-8 w-full flex justify-center">
  <iframe
    src="https://ephoriax.kit.com/b0ab7abf0b"
    className="w-full max-w-2xl h-[600px] border-0 rounded-xl shadow-md"
    title="EphoriaX Signup Form"
  />
</div>
        {status === "success" ? (
          <div className="text-center">
            <h2 className="text-green-600 font-semibold mb-2">
              Submission Received 🎉
            </h2>
            <p className="text-slate-600 text-sm">
              Thank you for joining the EphoriaX Beta! We’ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">     
            <div>
             {/*
              <label className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                value={formData.name}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              */}
            </div>
            
            <div>
              {/*
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
*/}
            </div>

            <div>
              {/*
              <label className="block text-sm font-medium text-slate-700">
                Business Type
              </label>
              <input
                type="text"
                name="businessType"
                placeholder="e.g. Realtor, Appraiser, Researcher"
                onChange={handleChange}
                value={formData.businessType}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              */}
            </div>

            
            <div>
              {/*
              <label className="block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={formData.city}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              */}
            </div>

{/*
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-md bg-indigo-600 text-white font-semibold py-2.5 hover:bg-indigo-700 transition"
            >
              {status === "submitting" ? "Submitting..." : "Submit"}
            </button>
*/}
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-red-600 text-center text-sm">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}