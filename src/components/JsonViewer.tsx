import React, { useState } from 'react';
import { WeatherApiResponse } from '../types/weather';

interface JsonViewerProps {
  data: WeatherApiResponse;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'raw'>('formatted');
  const [copiedTab, setCopiedTab] = useState<'formatted' | 'raw' | null>(null);

  const formattedJsonString = JSON.stringify(data, null, 2);
  const rawJsonString = JSON.stringify(data);

  const handleCopy = async (target: 'formatted' | 'raw') => {
    const textToCopy = target === 'formatted' ? formattedJsonString : rawJsonString;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedTab(target);
      setTimeout(() => {
        setCopiedTab(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  return (
    <div className="mt-5 animate-rise">
      {/* Tabs */}
      <div className="flex gap-2 mb-2.5">
        <button
          type="button"
          onClick={() => setActiveTab('formatted')}
          className={`flex-1 text-center py-2.5 px-3 rounded-xl border text-[13px] font-semibold transition-all cursor-pointer ${
            activeTab === 'formatted'
              ? 'text-skycred-gold-light border-skycred-gold bg-skycred-gold/10'
              : 'text-skycred-text-dim border-skycred-card-border bg-skycred-card hover:text-skycred-text'
          }`}
        >
          Formatted JSON
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('raw')}
          className={`flex-1 text-center py-2.5 px-3 rounded-xl border text-[13px] font-semibold transition-all cursor-pointer ${
            activeTab === 'raw'
              ? 'text-skycred-gold-light border-skycred-gold bg-skycred-gold/10'
              : 'text-skycred-text-dim border-skycred-card-border bg-skycred-card hover:text-skycred-text'
          }`}
        >
          Raw JSON
        </button>
      </div>

      {/* Code Box */}
      <div className="relative bg-[#08080a] border border-skycred-card-border rounded-2xl p-4 max-h-[320px] overflow-auto json-scrollbar">
        <button
          type="button"
          onClick={() => handleCopy(activeTab)}
          className="absolute top-2.5 right-2.5 bg-skycred-bg-elev border border-skycred-card-border text-skycred-text-dim text-[11px] px-2.5 py-1 rounded-lg cursor-pointer transition-colors hover:text-skycred-gold-light hover:border-skycred-gold z-20 font-medium"
        >
          {copiedTab === activeTab ? '✓ Copied!' : 'Copy'}
        </button>

        <pre className="font-mono text-xs leading-relaxed text-[#c9c9d2] whitespace-pre-wrap break-words pr-12">
          {activeTab === 'formatted' ? formattedJsonString : rawJsonString}
        </pre>
      </div>
    </div>
  );
};
