import React, { useEffect, useMemo, useState } from 'react';
import type { Hotel } from './types';
import { fetchHotelDetailImages, fetchHotelWebsiteUrl } from './api';

interface HotelDetailsModalProps {
  hotel: Hotel;
  onClose: () => void;
}

const DEFAULT_FACILITIES = [
  'Free WiFi',
  'Air Conditioning',
  'Breakfast Available',
  'Parking',
  '24/7 Front Desk'
];

// 2. Helper to select icons based on facility keywords
const getFacilityIcon = (name: string) => {
  const lowerName = name.toLowerCase();

  // Simple SVG Icon components
  if (lowerName.includes('wifi') || lowerName.includes('internet')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
  }
  if (lowerName.includes('air') || lowerName.includes('ac') || lowerName.includes('conditioning')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
  if (lowerName.includes('park')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>; // Simple check for parking
  }
  if (lowerName.includes('pool') || lowerName.includes('swim')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
  }
  if (lowerName.includes('service') || lowerName.includes('keeping')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }

  // Default generic icon (Star)
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
};

const stripHtml = (html: string) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  return tmp.textContent || tmp.innerText || '';
};

const normalizeExternalUrl = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    if (
      parsed.hostname.toLowerCase().includes('google.') &&
      parsed.pathname === '/url'
    ) {
      const realUrl =
        parsed.searchParams.get('q') ||
        parsed.searchParams.get('url');

      if (!realUrl) return null;

      const clean = new URL(realUrl);

      if (clean.hostname.toLowerCase().includes('google.')) {
        return null;
      }

      return clean.href;
    }

    if (parsed.hostname.toLowerCase().includes('google.')) {
      return null;
    }

    return parsed.href;
  } catch {
    // Handle URLs without protocol by prefixing https:// (supports paths and query strings).
    // Only attempt this for strings that look like a host/path and not something like "javascript:".
    if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && /\./.test(trimmed) && !/\s/.test(trimmed)) {
      try {
        const parsed = new URL(`https://${trimmed}`);

        if (parsed.hostname.toLowerCase().includes('google.') && parsed.pathname === '/url') {
          const realUrl = parsed.searchParams.get('q') || parsed.searchParams.get('url');
          if (!realUrl) return null;
          const clean = new URL(realUrl);
          if (clean.hostname.toLowerCase().includes('google.')) return null;
          return clean.href;
        }

        if (parsed.hostname.toLowerCase().includes('google.')) return null;

        return parsed.href;
      } catch {
        // ignore
      }
    }
  }

  return null;
};

const unwrapGoogleRedirect = (inputUrl: string): string | null => {
  const coerceToUrl = (raw: string): URL | null => {
    const trimmed = raw.trim();
    if (!trimmed) return null;

    // Relative Google redirect shapes like "/url?q=..."
    if (trimmed.startsWith('/url?') || trimmed.startsWith('/url&')) {
      try {
        return new URL(`https://www.google.com${trimmed}`);
      } catch {
        return null;
      }
    }

    // Protocol-less shapes like "google.com/url?q=..."
    if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && /^([\w-]+\.)+\w+/i.test(trimmed)) {
      try {
        return new URL(`https://${trimmed}`);
      } catch {
        // ignore
      }
    }

    try {
      return new URL(trimmed);
    } catch {
      // Sometimes the whole string is percent-encoded
      try {
        return new URL(decodeURIComponent(trimmed));
      } catch {
        return null;
      }
    }
  };

  const decodeMaybeTwice = (s: string): string => {
    let out = s;
    for (let i = 0; i < 2; i++) {
      try {
        const decoded = decodeURIComponent(out);
        if (decoded === out) break;
        out = decoded;
      } catch {
        break;
      }
    }
    return out;
  };

  const parsed = coerceToUrl(inputUrl);
  if (!parsed) return null;

  const host = parsed.hostname.toLowerCase();
  const path = parsed.pathname.toLowerCase();
  if (!host.includes('google.') || !path.startsWith('/url')) return null;

  const candidate = parsed.searchParams.get('q') || parsed.searchParams.get('url');
  if (!candidate) return null;

  const decoded = decodeMaybeTwice(candidate).trim();
  if (!decoded) return null;

  // Recursively unwrap nested Google wrappers
  if (/^https?:\/\/[^/]*google\./i.test(decoded)) {
    return unwrapGoogleRedirect(decoded);
  }

  if (!/^https?:\/\//i.test(decoded)) return null;
  try {
    return new URL(decoded).href;
  } catch {
    return null;
  }
};

const getBackendBaseUrl = (): string => {
  const env = (import.meta as { env?: Record<string, unknown> }).env;
  const fromEnv = env && typeof env.VITE_BACKEND_URL === 'string' ? env.VITE_BACKEND_URL : '';
  const cleaned = typeof fromEnv === 'string' ? fromEnv.trim().replace(/\/$/, '') : '';
  if (cleaned) return cleaned;

  // Dev-friendly default if user didn't configure env.
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://127.0.0.1:8000';
    }
  }

  return '';
};

const resolveFinalUrlViaBackend = async (rawUrl: string): Promise<string> => {
  const base = getBackendBaseUrl();
  if (!base) return rawUrl;

  try {
    const endpoint = `${base}/converter/resolve-url?url=${encodeURIComponent(rawUrl)}`;
    const resp = await fetch(endpoint);
    if (!resp.ok) return rawUrl;
    const json = (await resp.json()) as { url?: unknown };
    const resolved = typeof json.url === 'string' ? json.url.trim() : '';
    return resolved || rawUrl;
  } catch {
    return rawUrl;
  }
};

const isGoogleHost = (value: string): boolean => {
  try {
    const u = new URL(value);
    return u.hostname.toLowerCase().includes('google.');
  } catch {
    return false;
  }
};

const withTimeout = <T,>(p: Promise<T>, ms: number, fallback: T): Promise<T> => {
  let done = false;
  return new Promise((resolve) => {
    const t = window.setTimeout(() => {
      if (done) return;
      done = true;
      resolve(fallback);
    }, ms);
    p.then((v) => {
      if (done) return;
      done = true;
      window.clearTimeout(t);
      resolve(v);
    }).catch(() => {
      if (done) return;
      done = true;
      window.clearTimeout(t);
      resolve(fallback);
    });
  });
};

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({ hotel, onClose }) => {
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [fetchedWebsiteUrl, setFetchedWebsiteUrl] = useState<string | null>(null);
  const [resolvedBookingUrl, setResolvedBookingUrl] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setDetailImages([]);
    setFetchedWebsiteUrl(null);
    setResolvedBookingUrl(null);

    fetchHotelDetailImages(hotel.id)
      .then((imgs) => {
        if (cancelled) return;
        setDetailImages(imgs);
      })
      .catch(() => {
        if (cancelled) return;
        setDetailImages([]);
      });

    fetchHotelWebsiteUrl(hotel.id)
      .then((url) => {
        if (cancelled) return;
        setFetchedWebsiteUrl(url);
      })
      .catch(() => {
        if (cancelled) return;
        setFetchedWebsiteUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [hotel.id]);

  const displayFacilities = Array.from(
    new Set(
      (hotel.facilities || [])
        .filter((v): v is string => typeof v === 'string')
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
    )
  );

  const facilitiesToRender = displayFacilities.length > 0 ? displayFacilities : DEFAULT_FACILITIES;

  const images = useMemo(() => {
    const raw = (detailImages.length > 0)
      ? detailImages
      : (hotel.images && hotel.images.length > 0)
        ? hotel.images
        : (hotel.heroImage ? [hotel.heroImage] : []);

    return Array.from(
      new Set(
        raw
          .filter((v): v is string => typeof v === 'string')
          .map((v) => v.trim())
          .filter((v) => v.length > 0)
      )
    ).slice(0, 4);
  }, [detailImages, hotel.heroImage, hotel.images]);

  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600';

  useEffect(() => {
    const first = images[0] || hotel.heroImage || fallbackImage;
    setSelectedImage(first);
  }, [images, hotel.heroImage]);

  const websiteUrl = hotel.websiteUrl;

  const bookingUrl = useMemo(() => {
    const direct = normalizeExternalUrl(websiteUrl) || normalizeExternalUrl(fetchedWebsiteUrl);
    if (direct) return direct;

    const q = `${hotel.name} ${hotel.city} official website`;
    return `https://www.google.com/search?btnI=I&q=${encodeURIComponent(q)}`;
  }, [fetchedWebsiteUrl, hotel.city, hotel.name, websiteUrl]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // 1) Prefer official URL if present.
      const preferred = normalizeExternalUrl(websiteUrl) || normalizeExternalUrl(fetchedWebsiteUrl);
      if (preferred && !isGoogleHost(preferred)) {
        setResolvedBookingUrl(preferred);
        return;
      }

      const unwrapped = unwrapGoogleRedirect(bookingUrl);
      const local = normalizeExternalUrl(unwrapped || '');
      if (local && !isGoogleHost(local)) {
        setResolvedBookingUrl(local);
        return;
      }

      // 3) Otherwise, resolve via backend (may follow redirects).
      // Only do this for Google-derived URLs.
      if (!bookingUrl || !isGoogleHost(bookingUrl)) {
        setResolvedBookingUrl(null);
        return;
      }
      const resolved = await withTimeout(resolveFinalUrlViaBackend(bookingUrl), 8000, '');
      if (cancelled) return;

      const finalCandidate = unwrapGoogleRedirect(resolved) || resolved;
      const finalUrl = normalizeExternalUrl(finalCandidate);

      if (finalUrl && !isGoogleHost(finalUrl)) {
        setResolvedBookingUrl(finalUrl);
      } else {
        setResolvedBookingUrl(null);
      }
    };

    run().catch(() => {
      if (cancelled) return;
      setResolvedBookingUrl(null);
    });

    return () => {
      cancelled = true;
    };
  }, [bookingUrl, fetchedWebsiteUrl, websiteUrl]);

  const openUrlHref = useMemo(() => {
    // Only use a fully resolved, non-Google URL for the backend redirect.
    const urlToUse = resolvedBookingUrl;
    if (!urlToUse) return null;

    const encoded = encodeURIComponent(urlToUse);
    const base = getBackendBaseUrl();

    // Prefer explicit backend base when available (e.g. Render URL).
    if (base) {
      return `${base}/converter/open-url?url=${encoded}`;
    }

    // Fallback to relative path (useful if frontend and backend share origin).
    return `/converter/open-url?url=${encoded}`;
  }, [resolvedBookingUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-4xl h-[92dvh] sm:h-auto sm:max-h-[93vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

        <div className="relative shrink-0">
          <div className="relative h-56 sm:h-72 group bg-gray-100">
            <img
              src={selectedImage || fallbackImage}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <button
              title='Close modal'
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all hover:rotate-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">{hotel.name}</h2>
              <div className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-[#04c41a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-lg">{hotel.address}, {hotel.city}</span>
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <div className="flex gap-3 overflow-x-auto">
                {images.map((src, idx) => {
                  const isActive = src === selectedImage;
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSelectedImage(src)}
                      className={`shrink-0 cursor-pointer rounded-lg overflow-hidden border transition-colors ${isActive ? 'border-[#04c41a] border-3' : 'border-gray-200 hover:border-gray-300'}`}
                      aria-label={`Show photo ${idx + 1}`}
                      title={`Photo ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-14 sm:h-16 w-20 sm:w-24 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8">

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">About this stay</h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {stripHtml(hotel.description || "A wonderful place to stay.")}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
            {facilitiesToRender.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facilitiesToRender.map((facility, idx) => (
                  <div
                    key={`${facility}-${idx}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#04c41a]/30 transition-colors"
                  >
                    <div className="text-[#04c41a]">
                      {getFacilityIcon(facility)}
                    </div>
                    <span className="text-gray-700 font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No amenities provided by the API for this hotel.</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 sm:p-6 bg-white/95 backdrop-blur z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Price</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#04c41a]">
                  ${hotel.minPrice?.toFixed(2) || 'N/A'}
                </span>
                <span className="text-gray-400 font-medium">/ night</span>
              </div>
            </div>
            {openUrlHref ? (
              <a
                href={openUrlHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full sm:w-auto text-center bg-[#04c41a] hover:bg-[#03a315] text-white text-lg font-bold py-3 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
              >
                Book Now
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto text-center bg-gray-300 text-gray-600 text-lg font-bold py-3 px-8 rounded-xl cursor-not-allowed opacity-70"
              >
                Book Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetailsModal;