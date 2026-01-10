import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";

const renderValue = (val: any): string => {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (val === '') return '(empty)';
  if (val === false) return 'false';
  if (val === true) return 'true';
  if (Array.isArray(val)) {
    return val.length === 0 ? '(empty array)' : val.map(v => renderValue(v)).join(', ');
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val);
    return entries.length === 0 ? '(empty object)' : entries.map(([k, v]) => `${k}: ${renderValue(v)}`).join(', ');
  }
  return String(val);
};

const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
};

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  level?: number;
}

function CollapsibleSection({ title, children, defaultOpen = true, level = 0 }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const bgColors = ['bg-white', 'bg-slate-50', 'bg-slate-100'];
  const bgColor = bgColors[Math.min(level, bgColors.length - 1)];
  
  return (
    <div className={`${bgColor} rounded-lg border border-slate-200 overflow-hidden ${level === 0 ? 'shadow-sm' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-3 text-left hover:bg-slate-100 transition-colors"
      >
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
        <span className={`font-semibold ${level === 0 ? 'text-lg text-slate-900' : 'text-sm text-slate-700'}`}>
          {formatLabel(title)}
        </span>
      </button>
      {isOpen && (
        <div className="p-3 pt-0 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

interface DataRendererProps {
  data: any;
  level?: number;
}

function DataRenderer({ data, level = 0 }: DataRendererProps) {
  if (data === undefined || data === null || typeof data === 'boolean' || typeof data === 'number' || typeof data === 'string') {
    return <span className="text-slate-600 break-all">{renderValue(data)}</span>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className="text-slate-500 italic">(empty array)</span>;
    }

    const allPrimitives = data.every(item => 
      item === null || item === undefined || typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'
    );

    if (allPrimitives) {
      return (
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
          {data.map((item, i) => (
            <li key={i}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    }

    return (
      <div className="space-y-2">
        {data.map((item, i) => (
          <CollapsibleSection key={i} title={`Item ${i + 1}`} defaultOpen={level < 2} level={level + 1}>
            <DataRenderer data={item} level={level + 1} />
          </CollapsibleSection>
        ))}
      </div>
    );
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <span className="text-slate-500 italic">(empty object)</span>;
    }

    return (
      <div className="space-y-2">
        {entries.map(([key, value]) => {
          const isComplex = value !== null && typeof value === 'object';
          
          if (isComplex) {
            return (
              <CollapsibleSection key={key} title={key} defaultOpen={level < 1} level={level + 1}>
                <DataRenderer data={value} level={level + 1} />
              </CollapsibleSection>
            );
          }

          return (
            <div key={key} className="flex flex-wrap gap-2 py-1 border-b border-slate-100 last:border-0">
              <span className="font-medium text-slate-700 text-sm min-w-[140px]">{formatLabel(key)}:</span>
              <DataRenderer data={value} level={level + 1} />
            </div>
          );
        })}
      </div>
    );
  }

  return <span className="text-slate-600">{renderValue(data)}</span>;
}

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/n8n-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      console.log("n8n response:", data);
      setReport(data);
    } catch (err: any) {
      console.error("Error fetching report:", err);
      if (err.message?.includes("502") || err.message?.includes("empty")) {
        setError("The n8n workflow is not responding. Please ensure it is active in your n8n dashboard.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sectionsToRemove = ['_raw', '_debug_fire_v53', 'fireDepartment', 'diagnostics'];
  
  const cleanReportData = report?.[0] ? 
    Object.fromEntries(
      Object.entries(report[0]).filter(([key]) => !sectionsToRemove.includes(key))
    ) : null;

  const handleCopyJson = () => {
    if (cleanReportData) {
      navigator.clipboard.writeText(JSON.stringify([cleanReportData], null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="report-form max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Enter property address (e.g., 123 Main St, City, CA 12345)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="flex gap-3 mt-4 justify-center">
          <button
            type="submit"
            disabled={loading || !address.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAddress("");
              setReport(null);
              setError(null);
            }}
            className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {cleanReportData && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Property Report</h2>
            <button
              type="button"
              onClick={handleCopyJson}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy JSON"}
            </button>
          </div>

          {Object.entries(cleanReportData).map(([key, value]) => (
            <CollapsibleSection key={key} title={key} defaultOpen={true} level={0}>
              <DataRenderer data={value} level={0} />
            </CollapsibleSection>
          ))}
        </div>
      )}
    </div>
  );
}
