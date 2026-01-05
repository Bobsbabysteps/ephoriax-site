import { useState } from "react";
import { Home, AlertTriangle, FileText, Flame, Building2, Zap, Droplets, Sun } from "lucide-react";

interface PropertyData {
  version: string;
  generatedAt: string;
  property: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    overview: {
      address?: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      propertyType: string;
      lotSizeAcres: number;
      parcelNumber: string;
      landUse?: string;
      yearBuilt: number;
    };
    building?: {
      primaryStructure?: {
        type?: string;
        sizeSqFt?: number;
        yearBuilt?: number;
      };
      primaryResidence?: {
        sizeSqFt?: number;
        yearBuilt?: number;
      };
      mainStructure?: {
        type?: string;
        grossAreaSqFt?: number;
        yearBuilt?: number;
        bedrooms?: number;
        bathrooms?: number;
        garage?: boolean;
        attic?: boolean;
      };
      structures?: Array<{
        type?: string;
        areaSqFt?: number;
        sizeSqFt?: number;
        yearBuilt?: number;
      }>;
      totalBuildingAreaSqFt?: number;
      yearBuilt?: number;
      secondaryStructures?: Array<{
        type?: string;
        sizeSqFt?: number;
        yearBuilt?: number;
      }>;
      outbuildings?: Array<{
        type?: string;
        sizeSqFt?: number;
        yearBuilt?: number;
      }>;
      otherStructures?: Array<{
        type?: string;
        areaSqFt?: number;
        yearBuilt?: number;
      }>;
    };
    construction?: {
      buildingSizeSqFt?: number;
      yearBuilt?: number;
      mainDwellingConstructionYear?: number;
      agExemptBuildingConstructionYear?: number;
      isoConstructionClass?: string | null;
      roofType?: string | null;
      buildingPermits?: any[];
      permitHistory?: any[];
      additions?: any[];
    };
    interior?: {
      bedrooms?: number;
      totalBathrooms?: number;
      bathrooms?: number;
      attic?: boolean;
    };
    systems?: {
      hvac?: boolean | string | { present?: boolean; details?: string };
      solar?: Array<{
        systemSizeKw?: number;
        sizeKw?: number;
        capacityKw?: number;
        panels?: number;
        installDate?: string;
        yearInstalled?: number;
        installYear?: number;
      }> | {
        present?: boolean;
        systems?: Array<{ capacityKw?: number; panels?: number; installYear?: number }>;
      };
      electrical?: boolean | string | {
        mainServiceAmps?: number;
        recentUpgrades?: boolean;
        notes?: string;
        upgrades?: Array<{ date?: string; description?: string }>;
      };
      plumbing?: boolean | string | { recentUpgrades?: boolean; notes?: string };
      mechanical?: boolean | string | { recentUpgrades?: boolean; notes?: string };
    };
    permits?: any[];
    riskAndHazards?: {
      fireDamageHistory?: boolean;
      fireDamageDetails?: string;
    };
    occupancy?: {
      description?: string;
    };
    operations?: {
      description?: string;
    };
  };
  fireServices: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    distance: {
      km?: number;
      miles: number;
      meters?: number;
      time: string;
      seconds?: number;
    };
  };
  diagnostics: {
    completenessScore: number;
    validationPassed?: boolean;
    missingFields?: string[];
  };
  summary: {
    headline: string;
    keyHighlights: string[];
  };
  resources?: {
    apiUsage?: any[];
    totalEstimatedCostUSD?: number;
  };
  meta?: {
    dataSource?: string;
    version?: string;
    processedAt?: string;
    status?: string;
  };
}

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<PropertyData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const prop = report?.[0]?.property;
  const fire = report?.[0]?.fireServices;
  const diag = report?.[0]?.diagnostics;
  const summary = report?.[0]?.summary;
  const systems = prop?.systems;

  const yearBuilt = prop?.building?.yearBuilt || prop?.building?.mainStructure?.yearBuilt || prop?.overview?.yearBuilt || prop?.construction?.yearBuilt || prop?.construction?.mainDwellingConstructionYear;
  const buildingAge = yearBuilt ? new Date().getFullYear() - yearBuilt : null;
  const buildingSize = prop?.building?.totalBuildingAreaSqFt || prop?.building?.mainStructure?.grossAreaSqFt || prop?.building?.primaryResidence?.sizeSqFt || prop?.building?.primaryStructure?.sizeSqFt || prop?.construction?.buildingSizeSqFt || 
    (prop?.building?.structures?.find((s: any) => s.type === 'Main Dwelling')?.areaSqFt);
  
  const mainStructure = prop?.building?.structures?.find((s: any) => s.type === 'Main Dwelling' || s.type?.includes('Residence'));
  const outbuildings = prop?.building?.otherStructures || prop?.building?.outbuildings || prop?.building?.secondaryStructures || 
    prop?.building?.structures?.filter((s: any) => s.type !== 'Main Dwelling' && !s.type?.includes('Residence')) || [];
  
  const bedrooms = prop?.building?.mainStructure?.bedrooms || prop?.interior?.bedrooms;
  const bathrooms = prop?.building?.mainStructure?.bathrooms || prop?.interior?.totalBathrooms || prop?.interior?.bathrooms;
  const buildingPermits = prop?.construction?.buildingPermits || prop?.construction?.permitHistory || prop?.permits || [];
  
  const solarSystems = Array.isArray(systems?.solar) ? systems.solar : 
    (systems?.electrical as any)?.solarSystems || 
    (systems?.solar as any)?.systems || [];

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

      {report && prop && (
        <div className="space-y-6">
          {/* Property Report Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
            <div className="flex items-start gap-3 mb-4">
              <Home className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-slate-900">Property Report</h2>
                <p className="text-slate-500 text-sm flex items-center gap-1">
                  <span>📍</span> {prop.address}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Property Type</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {prop.overview?.propertyType || "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Year Built</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {yearBuilt || "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Lot Size (acres)</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {prop.overview?.lotSizeAcres?.toFixed(2) || "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Building Area (ft²)</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {buildingSize?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Building Age</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {buildingAge ? `${buildingAge} years` : "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Completeness</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {diag?.completenessScore ? `${diag.completenessScore}%` : "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Parcel Number</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {prop.overview?.parcelNumber || "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Land Use</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {prop.overview?.landUse || "N/A"}
                </p>
              </div>
            </div>

            {(bedrooms || bathrooms) && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                  <strong>Interior:</strong> {bedrooms} bedrooms, {bathrooms} bathrooms
                </p>
              </div>
            )}

            {/* Secondary Structures / Outbuildings */}
            {outbuildings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-2">Outbuildings / Secondary Structures:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {outbuildings.map((struct: any, i: number) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-2 text-sm">
                      <p><strong>{struct.type}</strong></p>
                      <p className="text-slate-600">{(struct.areaSqFt || struct.sizeSqFt)?.toLocaleString()} sq ft | Built {struct.yearBuilt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Systems Card */}
          {systems && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-bold text-slate-900">Property Systems</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systems.hvac !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">HVAC</p>
                    <p className="text-sm text-slate-600">
                      {typeof systems.hvac === 'boolean' ? (systems.hvac ? "Present" : "Not present") : 
                       typeof systems.hvac === 'string' ? (systems.hvac.toLowerCase() === 'present' ? "Present" : systems.hvac) : 
                       (systems.hvac?.present ? "Present" : "Not present")}
                    </p>
                    {typeof systems.hvac === 'object' && systems.hvac?.details && (
                      <p className="text-xs text-slate-500 mt-1">{systems.hvac.details}</p>
                    )}
                  </div>
                )}
                {solarSystems.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <p className="text-sm font-semibold text-slate-700">Solar System</p>
                    </div>
                    {solarSystems.map((s: any, i: number) => {
                      const kw = s.systemSizeKw || s.sizeKw || s.capacityKw;
                      const installed = s.installDate ? new Date(s.installDate).getFullYear() : (s.yearInstalled || s.installYear || s.year);
                      return (
                        <p key={i} className="text-xs text-slate-600 mt-1">
                          {kw} kW {s.panels ? `(${s.panels} panels)` : ''} {installed ? `- Installed ${installed}` : ''}
                          {s.notes && <span className="text-slate-500"> - {s.notes}</span>}
                        </p>
                      );
                    })}
                  </div>
                )}
                {systems.electrical && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">Electrical</p>
                    {typeof systems.electrical === 'object' && (systems.electrical.mainServiceAmps || (systems.electrical as any).mainBreakerAmps) && (
                      <p className="text-xs text-slate-600 mt-1">Main Service: {systems.electrical.mainServiceAmps || (systems.electrical as any).mainBreakerAmps} amps</p>
                    )}
                    {typeof systems.electrical === 'object' && (systems.electrical.upgrades?.length ?? 0) > 0 && (
                      <div className="text-xs text-slate-500 mt-1">
                        {systems.electrical.upgrades?.map((u: any, i: number) => (
                          <p key={i}>{u.date}: {u.description}</p>
                        ))}
                      </div>
                    )}
                    {typeof systems.electrical === 'string' && (
                      <p className="text-xs text-slate-500 mt-1">{systems.electrical}</p>
                    )}
                  </div>
                )}
                {systems.plumbing !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <p className="text-sm font-semibold text-slate-700">Plumbing</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {typeof systems.plumbing === 'boolean' ? (systems.plumbing ? "Present" : "Not present") :
                       typeof systems.plumbing === 'string' ? systems.plumbing : 
                       systems.plumbing?.notes || (systems.plumbing?.recentUpgrades ? "Recent upgrades" : "Present")}
                    </p>
                  </div>
                )}
                {systems.mechanical && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">Mechanical</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {typeof systems.mechanical === 'boolean' ? (systems.mechanical ? "Present" : "Not present") :
                       typeof systems.mechanical === 'string' ? systems.mechanical : 
                       (systems.mechanical as any)?.notes || "Present"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Risk & Hazards Card */}
          {prop.riskAndHazards?.fireDamageHistory && (
            <div className="bg-orange-50 rounded-2xl shadow-md p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold text-orange-900">Fire Damage History</h3>
              </div>
              <p className="text-sm text-orange-800">{prop.riskAndHazards.fireDamageDetails}</p>
            </div>
          )}

          {/* Fire Department Card */}
          {fire && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-bold text-slate-900">Fire Department Information</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-slate-500 mb-1">Station Name</p>
                  <p className="font-semibold text-slate-800 text-sm">{fire.name}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Distance</p>
                  <p className="font-semibold text-slate-800 text-sm">{fire.distance?.miles} miles</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Drive Time</p>
                  <p className="font-semibold text-slate-800 text-sm">{fire.distance?.time}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-3">{fire.address}</p>
            </div>
          )}

          {/* Building Permits Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Building Permits ({buildingPermits.length})
              </h3>
            </div>
            {buildingPermits.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-2">Date</th>
                      <th className="text-left py-2 px-2">Permit #</th>
                      <th className="text-left py-2 px-2">Description</th>
                      <th className="text-left py-2 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildingPermits.map((permit: any, i: number) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-2 px-2">{permit.date || permit.effectiveDate || "-"}</td>
                        <td className="py-2 px-2">{permit.permitNumber || permit.number || "-"}</td>
                        <td className="py-2 px-2">{permit.description || "-"}</td>
                        <td className="py-2 px-2">{permit.status || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No permits available</p>
            )}
          </div>

          {/* Summary Card */}
          {summary && (
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Summary</h3>
              <p className="text-indigo-800 mb-3">{summary.headline}</p>
              {summary.keyHighlights && (
                <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
                  {summary.keyHighlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Occupancy & Operations */}
          {(prop.occupancy?.description || prop.operations?.description) && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Property Details</h3>
              {prop.occupancy?.description && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-700">Occupancy</p>
                  <p className="text-sm text-slate-600">{prop.occupancy.description}</p>
                </div>
              )}
              {prop.operations?.description && (
                <div>
                  <p className="text-sm font-semibold text-slate-700">Operations</p>
                  <p className="text-sm text-slate-600">{prop.operations.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Copy JSON Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                if (report) {
                  navigator.clipboard.writeText(JSON.stringify(report, null, 2));
                }
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Copy Full Report JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
