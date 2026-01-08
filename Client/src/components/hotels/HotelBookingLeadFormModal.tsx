import React, { useEffect, useState } from 'react';

interface HotelBookingLeadFormModalProps {
  open: boolean;
  bookingUrl: string | null;
  hotelName?: string;
  onClose: () => void;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getBackendBaseUrl = (): string => {
  const env = (import.meta as { env?: Record<string, unknown> }).env;
  const fromEnv = env && typeof env.VITE_BACKEND_URL === 'string' ? env.VITE_BACKEND_URL : '';
  const cleaned = typeof fromEnv === 'string' ? fromEnv.trim().replace(/\/$/, '') : '';
  if (cleaned) return cleaned;

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://127.0.0.1:8000';
    }
  }

  return '';
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

const isGoogleHost = (value: string): boolean => {
  try {
    const u = new URL(value);
    return u.hostname.toLowerCase().includes('google.');
  } catch {
    return false;
  }
};

const unwrapGoogleRedirect = (inputUrl: string): string | null => {
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
      try {
        return new URL(decodeURIComponent(trimmed));
      } catch {
        return null;
      }
    }
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

const normalizeExternalUrl = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.href;
  } catch {
    return null;
  }
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

const HotelBookingLeadFormModal: React.FC<HotelBookingLeadFormModalProps> = ({
  open,
  bookingUrl,
  hotelName,
  onClose,
}) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [directUrl, setDirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
    setResolvedUrl(null);
    setDirectUrl(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!bookingUrl) {
      setResolvedUrl(null);
      setDirectUrl(null);
      return;
    }

    let cancelled = false;
    setResolvedUrl(null);

    const run = async () => {
      const initial = unwrapGoogleRedirect(bookingUrl) || bookingUrl;
      const backendResolved = await withTimeout(resolveFinalUrlViaBackend(initial), 8000, initial);
      const candidate = unwrapGoogleRedirect(backendResolved) || backendResolved || initial;
      const finalUrl = normalizeExternalUrl(candidate);

      if (cancelled) return;

      // We only consider it "resolved" if it is a non-Google destination.
      if (finalUrl && !isGoogleHost(finalUrl)) {
        setResolvedUrl(finalUrl);
      } else {
        setResolvedUrl(null);
      }

    };

    run().catch(() => {
      if (cancelled) return;
      setResolvedUrl(null);
    });

    return () => {
      cancelled = true;
    };
  }, [open, bookingUrl]);

  useEffect(() => {
    if (!open) return;

    const pick = (value: string | null | undefined): string | null => {
      const normalized = normalizeExternalUrl(value || '');
      if (!normalized) return null;
      if (isGoogleHost(normalized)) return null;
      return normalized;
    };

    // 1) Prefer backend-resolved final URL (already verified non-Google).
    const fromResolved = pick(resolvedUrl);
    if (fromResolved) {
      setDirectUrl(fromResolved);
      return;
    }

    // 2) Otherwise, if bookingUrl is a google /url wrapper, extract q=.
    if (bookingUrl) {
      const unwrapped = unwrapGoogleRedirect(bookingUrl);
      const fromUnwrapped = pick(unwrapped);
      if (fromUnwrapped) {
        setDirectUrl(fromUnwrapped);
        return;
      }
    }

    // 3) Finally, accept bookingUrl if it's already a direct non-Google URL.
    setDirectUrl(pick(bookingUrl));
  }, [open, bookingUrl, resolvedUrl]);

  if (!open) return null;

  const validate = () => {
    const next: { name?: string; email?: string; phone?: string } = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(form.email)) next.email = 'Invalid email';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const isFormValid =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    isValidEmail(form.email) &&
    form.phone.trim().length > 0;

  const handleContinueClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (!bookingUrl) return;
    if (!validate()) return;

    // Determine the best available direct URL to open
    let targetUrl: string | null = null;

    // 1. Prefer the backend-resolved direct URL if available
    if (directUrl) {
      targetUrl = directUrl;
    } else {
      // 2. Otherwise, unwrap Google redirect client-side
      const unwrapped = unwrapGoogleRedirect(bookingUrl);
      if (unwrapped) {
        const normalized = normalizeExternalUrl(unwrapped);
        if (normalized && !isGoogleHost(normalized)) {
          targetUrl = normalized;
        }
      }
      
      // 3. If unwrapping didn't work, check if bookingUrl itself is already direct
      if (!targetUrl) {
        const normalized = normalizeExternalUrl(bookingUrl);
        if (normalized && !isGoogleHost(normalized)) {
          targetUrl = normalized;
        }
      }
    }

    if (!targetUrl) return;

    // Open the hotel website directly in a new tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Complete your booking</h3>
              <p className="text-xs text-gray-500">
                {hotelName ? `For ${hotelName}` : 'Enter your details to continue.'}
              </p>
            </div>
            <button
              type="button"
              title="Close"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 rounded-lg px-2 py-1"
            >
              ✕
            </button>
          </div>
        </div>

        <form className="p-5 space-y-3">
          <div>
            <label htmlFor="hotel-lead-name" className="block text-xs font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="hotel-lead-name"
              value={form.name}
              onChange={(e) => {
                setForm((p) => ({ ...p, name: e.target.value }));
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className={`w-full px-3 py-2.5 rounded-xl border bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#04c41a]/30 ${
                errors.name ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="hotel-lead-email" className="block text-xs font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="hotel-lead-email"
                value={form.email}
                onChange={(e) => {
                  setForm((p) => ({ ...p, email: e.target.value }));
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full px-3 py-2.5 rounded-xl border bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#04c41a]/30 ${
                  errors.email ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="hotel-lead-phone" className="block text-xs font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                id="hotel-lead-phone"
                value={form.phone}
                onChange={(e) => {
                  setForm((p) => ({ ...p, phone: e.target.value }));
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
                type="tel"
                autoComplete="tel"
                placeholder="+254..."
                className={`w-full px-3 py-2.5 rounded-xl border bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#04c41a]/30 ${
                  errors.phone ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <a
            href="#"
            onClick={handleContinueClick}
            className={`block text-center w-full bg-[#04c41a] hover:bg-[#03a315] text-white font-bold py-3 rounded-xl transition-all active:scale-95 ${
              !bookingUrl || !isFormValid
                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                : ''
            }`}
          >
            Continue
          </a>
        </form>
      </div>
    </div>
  );
};

export default HotelBookingLeadFormModal;
