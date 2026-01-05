import { useState } from "react";
import { Home, AlertTriangle, FileText, Flame, Building2, Zap, Droplets, Sun } from "lucide-react";

// Utility to safely render any value - ensures ALL values display literally, even null/undefined
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
      propertyType?: string;
      propertySubType?: string;
      propertyClass?: string;
      lotSizeAcres?: number;
      parcelNumber?: string;
      apn?: string;
      landUse?: string;
      yearBuilt?: number;
      latitude?: number;
      longitude?: number;
    };
    building?: {
      primaryStructure?: { type?: string; sizeSqFt?: number; yearBuilt?: number; };
      primaryResidence?: { sizeSqFt?: number; yearBuilt?: number; };
      mainResidence?: { sizeSqFt?: number; yearBuilt?: number; permitNumber?: string; };
      mainStructure?: { type?: string; grossAreaSqFt?: number; yearBuilt?: number; bedrooms?: number; bathrooms?: number; garage?: boolean; attic?: boolean; };
      structures?: Array<{ type?: string; areaSqFt?: number; sizeSqFt?: number; yearBuilt?: number; description?: string; }>;
      additionalStructures?: Array<{ type?: string; sizeSqFt?: number; yearBuilt?: number; permitNumber?: string; }>;
      grossLivingAreaSqFt?: number;
      totalBuildingAreaSqFt?: number;
      lastMajorRenovationYear?: number;
      yearBuilt?: number;
      secondaryStructures?: Array<{ type?: string; sizeSqFt?: number; yearBuilt?: number; }>;
      outbuildings?: Array<{ type?: string; sizeSqFt?: number; yearBuilt?: number; }>;
      otherStructures?: Array<{ type?: string; areaSqFt?: number; yearBuilt?: number; }>;
    };
    construction?: {
      buildingSizeSqFt?: number;
      yearBuilt?: number;
      constructionYear?: number;
      mainDwellingConstructionYear?: number;
      mainResidenceYearBuilt?: number;
      agExemptBuildingConstructionYear?: number;
      isoConstructionClass?: string | null;
      roofType?: string | null;
      requiredPhotos?: string[];
      permits?: any[];
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
      hvac?: boolean | string | { present?: boolean; updated?: boolean; yearUpdated?: number; details?: string; notes?: string };
      plumbing?: boolean | string | { yearUpdated?: number; recentUpgrades?: boolean; notes?: string };
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
        serviceAmps?: string;
        yearUpdated?: number;
        recentUpgrades?: boolean;
        notes?: string;
        upgrades?: Array<{ date?: string; description?: string }>;
      };
      mechanical?: boolean | string | { recentUpgrades?: boolean; notes?: string };
    };
    permits?: any[];
    riskAndHazards?: {
      fireDamageHistory?: boolean;
      fireDamageDetails?: string;
      fire?: {
        recentFireRepair?: boolean;
        lastRepairYear?: number;
      };
      emergencyServicesProximity?: any;
    };
    occupancy?: {
      description?: string;
      occupancyType?: string;
      narrative?: string;
      occupancyNarrative?: string;
    };
    operations?: {
      description?: string;
      operationsDescription?: string;
      operationsNarrative?: string;
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
    apiUsage?: Array<{
      service?: string;
      endpoint?: string;
      model?: string;
      calls?: number;
      tokensUsed?: number;
      costPerCallUSD?: number;
      costPer1kTokensUSD?: number;
      totalCostUSD?: number;
    }>;
    totalEstimatedCostUSD?: number;
    executionMetrics?: {
      executionTimeMs?: number | null;
      workflowId?: string;
      runId?: string;
    };
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
  const resources = report?.[0]?.resources;
  const meta = report?.[0]?.meta;
  const reportVersion = report?.[0]?.version;
  const generatedAt = report?.[0]?.generatedAt;
  const systems = prop?.systems;

  const yearBuilt = prop?.building?.yearBuilt ?? prop?.building?.mainResidence?.yearBuilt ?? prop?.building?.mainStructure?.yearBuilt ?? prop?.overview?.yearBuilt ?? prop?.construction?.yearBuilt ?? prop?.construction?.mainDwellingConstructionYear ?? prop?.construction?.mainResidenceYearBuilt;
  const buildingAge = yearBuilt !== undefined && yearBuilt !== null ? new Date().getFullYear() - yearBuilt : null;
  const buildingSize = prop?.building?.grossLivingAreaSqFt ?? prop?.building?.mainResidence?.sizeSqFt ?? prop?.building?.totalBuildingAreaSqFt ?? prop?.building?.mainStructure?.grossAreaSqFt ?? prop?.building?.primaryResidence?.sizeSqFt ?? prop?.building?.primaryStructure?.sizeSqFt ?? prop?.construction?.buildingSizeSqFt ?? 
    (prop?.building?.structures?.find((s: any) => s.type === 'Primary Dwelling' || s.type === 'Main Dwelling' || s.type?.includes('Residence') || s.type?.includes('Dwelling'))?.areaSqFt) ??
    (prop?.building?.structures?.find((s: any) => s.type === 'Primary Dwelling' || s.type === 'Main Dwelling' || s.type?.includes('Residence') || s.type?.includes('Dwelling'))?.sizeSqFt);
  
  const parcelNumber = prop?.overview?.parcelNumber ?? prop?.overview?.apn;
  const landUse = prop?.overview?.landUse ?? prop?.overview?.propertySubType;
  
  const mainStructure = prop?.building?.mainResidence ?? prop?.building?.structures?.find((s: any) => s.type === 'Primary Dwelling' || s.type === 'Main Dwelling' || s.type?.includes('Residence') || s.type?.includes('Dwelling'));
  const outbuildings = [
    ...(prop?.building?.additionalStructures ?? []),
    ...(prop?.building?.otherStructures ?? []),
    ...(prop?.building?.outbuildings ?? []),
    ...(prop?.building?.secondaryStructures ?? []),
    ...(prop?.building?.structures?.filter((s: any) => s.type !== 'Primary Dwelling' && s.type !== 'Main Dwelling' && !s.type?.includes('Residence') && !s.type?.includes('Dwelling')) ?? [])
  ];
  
  const bedrooms = prop?.building?.mainStructure?.bedrooms ?? prop?.interior?.bedrooms;
  const bathrooms = prop?.building?.mainStructure?.bathrooms ?? prop?.interior?.totalBathrooms ?? prop?.interior?.bathrooms;
  const buildingPermits = [
    ...(prop?.permits ?? []),
    ...(prop?.construction?.permits ?? []),
    ...(prop?.construction?.buildingPermits ?? []),
    ...(prop?.construction?.permitHistory ?? [])
  ];
  
  const solarData = systems?.solar;
  const solarSystems = [
    ...(Array.isArray(solarData) ? solarData : []),
    ...((solarData as any)?.systems ?? []),
    ...((systems?.electrical as any)?.solarSystems ?? [])
  ];
  const hasSolarData = solarData !== undefined || solarSystems.length > 0;
  
  // Preserve raw HVAC value for display - no prose substitutions
  const hvacRaw = systems?.hvac;
  const hvacNotes = typeof systems?.hvac === 'object' ? (systems.hvac?.notes ?? systems.hvac?.details) : null;
  
  const lastRenovation = prop?.building?.lastMajorRenovationYear;
  const requiredPhotos = prop?.construction?.requiredPhotos ?? [];
  const isoClass = prop?.construction?.isoConstructionClass;
  const fireRisk = prop?.riskAndHazards?.fire;
  const fireRepair = fireRisk?.recentFireRepair;
  const fireRepairYear = fireRisk?.lastRepairYear;
  const hasFireData = fireRisk !== undefined || prop?.riskAndHazards?.fireDamageHistory !== undefined || prop?.riskAndHazards?.fireDamageDetails !== undefined;
  const occupancyInfo = prop?.occupancy?.narrative ?? prop?.occupancy?.occupancyNarrative ?? prop?.occupancy?.occupancyType ?? prop?.occupancy?.description;
  const operationsInfo = prop?.operations?.operationsDescription ?? prop?.operations?.operationsNarrative ?? prop?.operations?.description;
  const coordinates = prop?.coordinates ?? { lat: prop?.overview?.latitude, lng: prop?.overview?.longitude };
  const allStructures = prop?.building?.structures ?? [];
  const emergencyServicesRaw = [
    ...(Array.isArray(prop?.riskAndHazards?.emergencyServicesProximity) ? prop.riskAndHazards.emergencyServicesProximity : []),
    ...(Array.isArray(prop?.riskAndHazards?.emergencyServices) ? prop.riskAndHazards.emergencyServices : []),
    ...(Array.isArray(prop?.riskAndHazards?.nearbyEmergencyServices) ? prop.riskAndHazards.nearbyEmergencyServices : [])
  ];
  const emergencyServicesObj = 
    (!Array.isArray(prop?.riskAndHazards?.emergencyServicesProximity) && typeof prop?.riskAndHazards?.emergencyServicesProximity === 'object' ? prop.riskAndHazards.emergencyServicesProximity : null) ??
    (!Array.isArray(prop?.riskAndHazards?.emergencyServices) && typeof prop?.riskAndHazards?.emergencyServices === 'object' ? prop.riskAndHazards.emergencyServices : null) ??
    (!Array.isArray(prop?.riskAndHazards?.nearbyEmergencyServices) && typeof prop?.riskAndHazards?.nearbyEmergencyServices === 'object' ? prop.riskAndHazards.nearbyEmergencyServices : null);
  const emergencyServices = emergencyServicesRaw.length > 0 ? emergencyServicesRaw : emergencyServicesObj;
  const hasEmergencyServices = emergencyServices !== null && emergencyServices !== undefined;

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
                  <span>📍</span> {renderValue(prop.address)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Property Type</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(prop.overview?.propertyType)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Year Built</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(yearBuilt)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Lot Size (acres)</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(prop.overview?.lotSizeAcres)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Building Area (ft²)</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(buildingSize)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Year Built</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(yearBuilt)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Completeness</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(diag?.completenessScore)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Parcel Number</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(parcelNumber)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Land Use</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {renderValue(landUse)}
                </p>
              </div>
            </div>

            {(bedrooms !== undefined || bathrooms !== undefined || lastRenovation !== undefined || isoClass !== undefined) && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                {(bedrooms !== undefined || bathrooms !== undefined) && (
                  <p className="text-sm text-slate-600">
                    Bedrooms: {renderValue(bedrooms)}, Bathrooms: {renderValue(bathrooms)}
                  </p>
                )}
                {lastRenovation !== undefined && (
                  <p className="text-sm text-slate-600">
                    <strong>Last Major Renovation:</strong> {renderValue(lastRenovation)}
                  </p>
                )}
                {isoClass !== undefined && (
                  <p className="text-sm text-slate-600">
                    <strong>ISO Construction Class:</strong> {renderValue(isoClass)}
                  </p>
                )}
              </div>
            )}

            {(coordinates?.lat !== undefined && coordinates?.lat !== null) || (coordinates?.lng !== undefined && coordinates?.lng !== null) ? (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                  <strong>Coordinates:</strong> {renderValue(coordinates?.lat)}, {renderValue(coordinates?.lng)}
                </p>
              </div>
            ) : null}

            {/* All Structures with descriptions */}
            {allStructures.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-2">Building Structures:</p>
                <div className="space-y-2">
                  {allStructures.map((struct: any, i: number) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-slate-800">{renderValue(struct.type)}</p>
                      <p className="text-slate-600">Area: {renderValue(struct.areaSqFt ?? struct.sizeSqFt)} | Year Built: {renderValue(struct.yearBuilt)}</p>
                      {struct.description !== undefined && (
                        <p className="text-slate-500 text-xs mt-1">{renderValue(struct.description)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outbuildings / Secondary Structures (always show merged data) */}
            {outbuildings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-2">Outbuildings / Secondary Structures:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {outbuildings.map((struct: any, i: number) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-2 text-sm">
                      <p><strong>{renderValue(struct.type)}</strong></p>
                      <p className="text-slate-600">Area: {renderValue(struct.areaSqFt ?? struct.sizeSqFt)} | Year Built: {renderValue(struct.yearBuilt)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Systems Card */}
          {systems !== undefined && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-bold text-slate-900">Property Systems</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hvacRaw !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">HVAC</p>
                    <p className="text-sm text-slate-600">
                      {renderValue(hvacRaw)}
                    </p>
                    {hvacNotes !== undefined && hvacNotes !== null && (
                      <p className="text-xs text-slate-500 mt-1">{renderValue(hvacNotes)}</p>
                    )}
                  </div>
                )}
                {hasSolarData && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <p className="text-sm font-semibold text-slate-700">Solar System</p>
                    </div>
                    {solarSystems.length > 0 ? (
                      solarSystems.map((s: any, i: number) => (
                        <p key={i} className="text-xs text-slate-600 mt-1">
                          {renderValue(s)}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 mt-1">{renderValue(solarData)}</p>
                    )}
                  </div>
                )}
                {systems.electrical !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">Electrical</p>
                    <p className="text-xs text-slate-500 mt-1">{renderValue(systems.electrical)}</p>
                  </div>
                )}
                {systems.plumbing !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <p className="text-sm font-semibold text-slate-700">Plumbing</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {renderValue(systems.plumbing)}
                    </p>
                  </div>
                )}
                {systems.mechanical !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">Mechanical</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {renderValue(systems.mechanical)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Risk & Hazards Card */}
          {hasFireData && (
            <div className="bg-orange-50 rounded-2xl shadow-md p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold text-orange-900">Fire Damage History</h3>
              </div>
              <div className="space-y-2 text-sm text-orange-800">
                {fireRepair !== undefined && (
                  <p><strong>Recent Fire Repair:</strong> {renderValue(fireRepair)}</p>
                )}
                {fireRepairYear !== undefined && (
                  <p><strong>Last Repair Year:</strong> {renderValue(fireRepairYear)}</p>
                )}
                {prop.riskAndHazards?.fireDamageHistory !== undefined && (
                  <p><strong>Fire Damage History:</strong> {renderValue(prop.riskAndHazards.fireDamageHistory)}</p>
                )}
                {prop.riskAndHazards?.fireDamageDetails !== undefined && (
                  <p><strong>Details:</strong> {renderValue(prop.riskAndHazards.fireDamageDetails)}</p>
                )}
              </div>
            </div>
          )}

          {/* Emergency Services Proximity */}
          {hasEmergencyServices && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-900">Emergency Services Proximity</h3>
              </div>
              {Array.isArray(emergencyServices) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emergencyServices.map((svc: any, i: number) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-slate-800">{renderValue(svc.type ?? svc.serviceType)}</p>
                      <p className="text-slate-600">{renderValue(svc.name ?? svc.stationName)}</p>
                      {(svc.distance !== undefined && svc.distance !== null) || (svc.distanceMiles !== undefined && svc.distanceMiles !== null) ? (
                        <p className="text-xs text-slate-500">Distance: {renderValue(svc.distance ?? svc.distanceMiles)}, Unit: {renderValue(svc.distanceUnit)}</p>
                      ) : null}
                      {svc.responseTime !== undefined && <p className="text-xs text-slate-500">Response Time: {renderValue(svc.responseTime)}</p>}
                      {svc.address !== undefined && <p className="text-xs text-slate-400 mt-1">{renderValue(svc.address)}</p>}
                    </div>
                  ))}
                </div>
              ) : typeof emergencyServices === 'object' ? (
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                  {emergencyServices.fireStation !== undefined && <p><strong>Fire Station:</strong> {renderValue(emergencyServices.fireStation)}</p>}
                  {emergencyServices.hospital !== undefined && <p><strong>Hospital:</strong> {renderValue(emergencyServices.hospital)}</p>}
                  {emergencyServices.police !== undefined && <p><strong>Police:</strong> {renderValue(emergencyServices.police)}</p>}
                  {emergencyServices.description !== undefined && <p className="text-slate-600 mt-1">{renderValue(emergencyServices.description)}</p>}
                </div>
              ) : (
                <p className="text-sm text-slate-600">{renderValue(emergencyServices)}</p>
              )}
            </div>
          )}

          {/* Fire Department Card */}
          {fire !== undefined && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-bold text-slate-900">Fire Department Information</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-slate-500 mb-1">Station Name</p>
                  <p className="font-semibold text-slate-800 text-sm">{renderValue(fire.name)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Distance</p>
                  <p className="font-semibold text-slate-800 text-sm">Miles: {renderValue(fire.distance?.miles)}, KM: {renderValue(fire.distance?.km)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Drive Time</p>
                  <p className="font-semibold text-slate-800 text-sm">Time: {renderValue(fire.distance?.time)}, Seconds: {renderValue(fire.distance?.seconds)}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-3">{renderValue(fire.address)}</p>
              {fire.coordinates !== undefined && (
                <p className="text-xs text-slate-400 mt-1">Coordinates: {renderValue(fire.coordinates.lat)}, {renderValue(fire.coordinates.lng)}</p>
              )}
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
              <div className="space-y-3">
                {buildingPermits.map((permit: any, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-slate-800">{renderValue(permit.permitNumber ?? permit.number)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${permit.status?.toLowerCase() === 'complete' || permit.status?.toLowerCase() === 'finaled' || permit.status?.toLowerCase() === 'final' ? 'bg-green-100 text-green-800' : permit.status?.toLowerCase() === 'canceled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {renderValue(permit.status)}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs mb-1">{renderValue(permit.date ?? permit.effectiveDate)}</p>
                    {permit.type !== undefined && <p className="text-slate-500 text-xs mb-1"><strong>Type:</strong> {renderValue(permit.type)}</p>}
                    <p className="text-slate-700">{renderValue(permit.description)}</p>
                    <div className="flex gap-4 mt-2 text-xs text-slate-500">
                      {permit.value !== undefined && (
                        <span><strong>Value:</strong> {renderValue(permit.value)}</span>
                      )}
                      {permit.contractor !== undefined && <span><strong>Contractor:</strong> {renderValue(permit.contractor)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No permits available</p>
            )}
          </div>

          {/* Summary Card */}
          {summary !== undefined && (
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Summary</h3>
              <p className="text-indigo-800 mb-3">{renderValue(summary.headline)}</p>
              {summary.keyHighlights !== undefined && (
                <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
                  {summary.keyHighlights.map((h: any, i: number) => (
                    <li key={i}>{renderValue(h)}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Required Photos */}
          {(prop?.construction?.requiredPhotos !== undefined) && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Required Photos for Inspection ({requiredPhotos.length})</h3>
              {requiredPhotos.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {requiredPhotos.map((photo: any, i: number) => (
                    <li key={i}>{renderValue(photo)}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm">No photos required</p>
              )}
            </div>
          )}

          {/* Occupancy & Operations */}
          {(occupancyInfo !== undefined || operationsInfo !== undefined) && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Property Details</h3>
              {occupancyInfo !== undefined && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-700">Occupancy</p>
                  <p className="text-sm text-slate-600">{renderValue(occupancyInfo)}</p>
                </div>
              )}
              {operationsInfo !== undefined && (
                <div>
                  <p className="text-sm font-semibold text-slate-700">Operations</p>
                  <p className="text-sm text-slate-600">{renderValue(operationsInfo)}</p>
                </div>
              )}
            </div>
          )}

          {/* Diagnostics */}
          {diag && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Data Quality & Diagnostics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Completeness Score</p>
                  <p className="font-semibold text-slate-800 text-sm">{renderValue(diag.completenessScore)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Validation</p>
                  <p className="font-semibold text-sm text-slate-800">
                    {renderValue(diag.validationPassed)}
                  </p>
                </div>
                {diag.missingFields && diag.missingFields.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-3 col-span-2 md:col-span-1">
                    <p className="text-xs text-slate-500 mb-1">Missing Fields</p>
                    <p className="font-semibold text-slate-800 text-sm">{diag.missingFields.map((f: any) => renderValue(f)).join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* API Usage & Resources */}
          {resources && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">API Resources & Costs</h3>
              {resources.apiUsage && resources.apiUsage.length > 0 && (
                <div className="space-y-2 mb-4">
                  {resources.apiUsage.map((api: any, i: number) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-700">{renderValue(api.service)}</p>
                        <p className="text-xs text-slate-500">
                          {api.endpoint !== undefined && api.endpoint !== null && `Endpoint: ${renderValue(api.endpoint)}`}
                          {api.model !== undefined && api.model !== null && ` | Model: ${renderValue(api.model)}`}
                          {api.calls !== undefined && api.calls !== null && ` | Calls: ${renderValue(api.calls)}`}
                          {api.tokensUsed !== undefined && api.tokensUsed !== null && ` | Tokens: ${renderValue(api.tokensUsed)}`}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600">{renderValue(api.totalCostUSD)}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                <p className="font-semibold text-slate-700">Total Estimated Cost</p>
                <p className="font-bold text-lg text-slate-900">{renderValue(resources.totalEstimatedCostUSD)}</p>
              </div>
              {resources.executionMetrics && (
                <div className="mt-3 text-xs text-slate-500">
                  <p>Workflow ID: {renderValue(resources.executionMetrics.workflowId)} | Run ID: {renderValue(resources.executionMetrics.runId)}</p>
                  {resources.executionMetrics.executionTimeMs !== undefined && resources.executionMetrics.executionTimeMs !== null && (
                    <p>Execution Time: {renderValue(resources.executionMetrics.executionTimeMs)}ms</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Meta Information */}
          {(meta || reportVersion || generatedAt) && (
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-700 mb-3">Report Metadata</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {reportVersion !== undefined && (
                  <div>
                    <p className="text-xs text-slate-500">Report Version</p>
                    <p className="font-semibold text-slate-700">{renderValue(reportVersion)}</p>
                  </div>
                )}
                {generatedAt !== undefined && (
                  <div>
                    <p className="text-xs text-slate-500">Generated At</p>
                    <p className="font-semibold text-slate-700">{renderValue(generatedAt)}</p>
                  </div>
                )}
                {meta?.dataSource !== undefined && (
                  <div>
                    <p className="text-xs text-slate-500">Data Source</p>
                    <p className="font-semibold text-slate-700">{renderValue(meta.dataSource)}</p>
                  </div>
                )}
                {meta?.status !== undefined && (
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <p className={`font-semibold ${meta.status === 'ok' ? 'text-green-600' : 'text-red-600'}`}>{renderValue(meta.status)}</p>
                  </div>
                )}
              </div>
              {meta?.processedAt !== undefined && (
                <p className="text-xs text-slate-500 mt-3">Processed: {renderValue(meta.processedAt)}</p>
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
