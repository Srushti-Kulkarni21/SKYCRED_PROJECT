import React from 'react';

interface WeatherMetricsProps {
  humidity: number;
  windKph: number;
  uv: number;
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({
  humidity,
  windKph,
  uv,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2.5 relative z-10">
      <div className="bg-white/[0.03] border border-skycred-card-border rounded-xl p-3 text-center">
        <div className="font-grotesk text-[17px] font-bold text-skycred-gold-light">
          {humidity}%
        </div>
        <div className="text-[10.5px] text-skycred-text-faint uppercase tracking-[0.6px] mt-1 font-medium">
          Humidity
        </div>
      </div>
      <div className="bg-white/[0.03] border border-skycred-card-border rounded-xl p-3 text-center">
        <div className="font-grotesk text-[17px] font-bold text-skycred-gold-light">
          {windKph} <span className="text-xs font-normal">kph</span>
        </div>
        <div className="text-[10.5px] text-skycred-text-faint uppercase tracking-[0.6px] mt-1 font-medium">
          Wind
        </div>
      </div>
      <div className="bg-white/[0.03] border border-skycred-card-border rounded-xl p-3 text-center">
        <div className="font-grotesk text-[17px] font-bold text-skycred-gold-light">
          {uv}
        </div>
        <div className="text-[10.5px] text-skycred-text-faint uppercase tracking-[0.6px] mt-1 font-medium">
          UV Index
        </div>
      </div>
    </div>
  );
};
