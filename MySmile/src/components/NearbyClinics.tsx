import React, { useState } from "react";
import { MapPin, Loader2, AlertCircle, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Clinic {
  name: string;
  address: string;
  location: { lat: number; lng: number };
  place_id: string;
}

const NearbyClinics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  // device location
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        fetchClinics(latitude, longitude);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionDenied(true);
          setError("Location permission denied. Please enable location services or use the manual search.");
        } else {
          setError("Unable to retrieve your location.");
        }
      }
    );
  };

  // Geocode manual input using Nominatim
  const geocodeLocation = async (query: string) => {
    try {
      const url = "https://nominatim.openstreetmap.org/search";
      const params = {
        q: query,
        format: "json",
        limit: 1,
      };
      const headers = {
        "User-Agent": "MySmileApp/1.0",
        "From": "your-email@example.com",
      };
      const response = await fetch(`${url}?${new URLSearchParams(params)}`, { headers });
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Location not found");
      }
      const { lat, lon } = data[0];
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lon);
      setUserLocation({ lat: latNum, lng: lngNum });
      await fetchClinics(latNum, lngNum);
    } catch (err: any) {
      setError(err.message || "Failed to find location. Please try again.");
      setLoading(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLocation.trim()) {
      setError("Please enter a location.");
      return;
    }
    setLoading(true);
    setError(null);
    geocodeLocation(manualLocation.trim());
  };

  const fetchClinics = async (lat: number, lng: number) => {
    try {
      const response = await fetch("http://localhost:8000/api/clinics/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, radius: 5000 }),
      });
      const data = await response.json();
      if (data.status === "ok") {
        setClinics(data.results);
      } else {
        setError("Failed to fetch clinics. Please try again.");
      }
    } catch (err) {
      setError("Network error while fetching clinics.");
    } finally {
      setLoading(false);
    }
  };

  const getDirectionsUrl = (clinicLat: number, clinicLng: number) => {
    if (!userLocation) return "#";
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${clinicLat},${clinicLng}&travelmode=driving`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-12">
      <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <MapPin size={20} className="text-stone-500" />
        Find Nearby Dental Clinics
      </h3>

      {/* Location input row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleManualSearch} className="flex-1 flex gap-2">
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            placeholder="Enter city, address, or zip code"
            className="flex-1 px-4 py-3 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-700"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-stone-900 text-white px-6 rounded-full hover:bg-stone-800"
          >
            <Search size={18} />
          </Button>
        </form>
        <Button
          onClick={fetchLocation}
          disabled={loading}
          variant="outline"
          className="border-stone-200 text-stone-700 hover:bg-stone-50"
        >
          <MapPin size={18} className="mr-2" />
          Use My Location
        </Button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-stone-400" />
          <p className="text-stone-500 mt-4">Finding clinics near you...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {clinics.length > 0 && userLocation && (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {clinics.map((clinic) => (
            <div
              key={clinic.place_id}
              className="border border-stone-100 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-stone-800">{clinic.name}</h4>
              <p className="text-sm text-stone-500 mt-1">{clinic.address}</p>
              <div className="mt-3">
                <a
                  href={getDirectionsUrl(clinic.location.lat, clinic.location.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-stone-700 hover:text-stone-900"
                >
                  <ExternalLink size={14} />
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && clinics.length === 0 && userLocation && (
        <p className="text-center text-stone-500 text-sm py-8">
          No dental clinics found within 5km of this location.
        </p>
      )}
    </div>
  );
};

export default NearbyClinics;