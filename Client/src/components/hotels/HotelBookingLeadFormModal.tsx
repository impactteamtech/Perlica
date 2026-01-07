import React, { useEffect, useState } from 'react';

interface HotelBookingLeadFormModalProps {
  open: boolean;
  bookingUrl: string | null;
  hotelName?: string;
  onClose: () => void;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const HotelBookingLeadFormModal: React.FC<HotelBookingLeadFormModalProps> = ({
  open,
  bookingUrl,
  hotelName,
  onClose,
}) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  useEffect(() => {
    if (!open) return;
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
    setToast({ open: false, message: '' });
  }, [open]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingUrl) return;
    if (!validate()) return;

    setToast({ open: true, message: 'Thank you for filling out the form.' });

    // Keep current page; open the hotel site in a new tab.
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');

    window.setTimeout(() => {
      setToast({ open: false, message: '' });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {toast.open && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 z-[70]">
          <div className="bg-gray-900 text-white text-sm sm:text-base px-4 py-3 rounded-xl shadow-lg border border-white/10">
            {toast.message}
          </div>
        </div>
      )}

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

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
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

          <button
            type="submit"
            disabled={!bookingUrl}
            className="w-full bg-[#04c41a] hover:bg-[#03a315] text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelBookingLeadFormModal;
