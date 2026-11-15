import React from 'react';

interface StatusMessageProps {
  isLoading: boolean;
  error: string | null;
  loadingCity?: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  isLoading,
  error,
  loadingCity,
}) => {
  if (!isLoading && !error) return null;

  return (
    <div className="text-center py-8 text-sm">
      {isLoading && (
        <div className="text-skycred-text-dim flex flex-col items-center">
          <div className="w-6 h-6 rounded-full border-2 border-skycred-card-border border-t-skycred-gold animate-spin mb-3" />
          <span>Fetching weather for {loadingCity || 'selected city'}…</span>
        </div>
      )}

      {!isLoading && error && (
        <div className="p-4 bg-skycred-red/10 border border-skycred-red/20 rounded-xl text-skycred-red text-[13.5px]">
          {error}
        </div>
      )}
    </div>
  );
};
