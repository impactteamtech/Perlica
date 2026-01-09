import React, { useEffect, useRef, useState } from 'react';
import { Loader, MapPin } from 'lucide-react';

interface GooglePlacesInputProps {
  value: string;
  onChange: (value: string, placeData?: PlaceData) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  inputId?: string;
  countryCode?: string;
  ariaLabel?: string;
}

interface PlaceData {
  address: string;
  latitude?: number;
  longitude?: number;
  placeId?: string;
}

interface PlacePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText?: string;
  latitude?: number;
  longitude?: number;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    country_code?: string;
  };
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  value,
  onChange,
  placeholder = "Enter destination...",
  icon,
  inputId,
  countryCode = 'ke',
  ariaLabel,
}) => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPredictions = (inputValue: string) => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    if (!inputValue || inputValue.trim().length < 2) {
      setPredictions([]);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }

    debounceTimerRef.current = window.setTimeout(async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);

      try {
        const url = new URL('https://nominatim.openstreetmap.org/search');
        url.searchParams.set('q', inputValue);
        url.searchParams.set('format', 'json');
        url.searchParams.set('addressdetails', '1');
        url.searchParams.set('limit', '5');

        const response = await fetch(url.toString(), {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          setPredictions([]);
          setShowSuggestions(false);
          return;
        }

        const results = (await response.json()) as NominatimResult[];
        const normalized: PlacePrediction[] = results
          .filter((r) => {
            const cc = r.address?.country_code?.toLowerCase();
            return !countryCode || !cc || cc === countryCode.toLowerCase();
          })
          .map((r) => {
            const lat = Number(r.lat);
            const lon = Number(r.lon);

            const [mainText, ...rest] = r.display_name.split(',');
            const secondaryText = rest.join(',').trim() || undefined;

            return {
              placeId: String(r.place_id),
              description: r.display_name,
              mainText: mainText.trim() || r.display_name,
              secondaryText,
              latitude: Number.isFinite(lat) ? lat : undefined,
              longitude: Number.isFinite(lon) ? lon : undefined,
            };
          });

        setPredictions(normalized);
        setShowSuggestions(true);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Nominatim error:', error);
        }
        setPredictions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, 250);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    fetchPredictions(inputValue);
  };

  const handleSelectPrediction = (prediction: PlacePrediction) => {
    onChange(prediction.description, {
      address: prediction.description,
      latitude: prediction.latitude,
      longitude: prediction.longitude,
      placeId: prediction.placeId,
    });
    setShowSuggestions(false);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
          {icon || <MapPin className="w-5 h-5" />}
        </div>
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => value && setShowSuggestions(true)}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Loader className="w-4 h-4 animate-spin text-green-500" />
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {predictions.map((prediction) => (
            <button
              key={prediction.placeId}
              type="button"
              onClick={() => handleSelectPrediction(prediction)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {prediction.mainText}
                  </div>
                  {prediction.secondaryText && (
                    <div className="text-gray-500 text-xs truncate">
                      {prediction.secondaryText}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GooglePlacesInput;
