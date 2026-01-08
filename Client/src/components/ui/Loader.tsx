import React from 'react';

type LoaderProps = {
  fullscreen?: boolean;
  label?: string;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ fullscreen = true, label = 'Loading…', className }) => {
  const containerClassName = fullscreen
    ? `fixed inset-0 z-300 flex items-center justify-center background-color to-slate-50 ${
        className ?? ''
      }`
    : `w-full flex items-center justify-center py-10 ${className ?? ''}`;

  return (
    <div className={containerClassName} role="status" aria-live="polite" aria-label={label}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-secondary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
          </div>
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-700">{label}</p>
      </div>
    </div>
  );
};

export default Loader;
