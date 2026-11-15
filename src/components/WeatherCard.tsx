import React from 'react';
import { WeatherApiResponse } from '../types/weather';
import { getSkyCreditMood } from '../utils/mood';
import { WeatherMetrics } from './WeatherMetrics';

interface WeatherCardProps {
  data: WeatherApiResponse;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { location, current } = data;
  const mood = getSkyCreditMood(current.temp_c, current.humidity, current.wind_kph);

  // Secure icon URL handling (WeatherAPI returns //cdn.weatherapi.com/...)
  const iconUrl = current.condition.icon.startsWith('//')
    ? `https:${current.condition.icon}`
    : current.condition.icon;

  return (
    <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#1a1a1f] via-[#111114] to-[#0a0a0c] border border-white/[0.09] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] mb-5 animate-rise">
      {/* Ambient background glow */}
      <div className="absolute -top-[60%] -right-[30%] w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(243,201,105,0.16),transparent_70%)] pointer-events-none" />

      {/* Top row: City name & Region & Weather Icon */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h2 className="font-grotesk text-[22px] font-bold text-skycred-text">
            {location.name}
          </h2>
          <div className="text-skycred-text-dim text-[13px] mt-0.5">
            {location.region ? `${location.region}, ` : ''}{location.country}
          </div>
          <div className="text-skycred-text-faint text-[12px] mt-1.5">
            Local time: {location.localtime}
          </div>
        </div>
        <div className="w-14 h-14 flex items-center justify-center">
          <img
            src={iconUrl}
            alt={current.condition.text}
            className="w-14 h-14 object-contain filter drop-shadow-md"
          />
        </div>
      </div>

      {/* Temperature Display */}
      <div className="flex items-baseline gap-1.5 my-4 relative z-10">
        <span className="font-grotesk text-[64px] font-bold leading-none tracking-tight">
          {Math.round(current.temp_c)}
        </span>
        <span className="text-[26px] text-skycred-text-dim font-medium">°C</span>
      </div>

      {/* Condition & Feels like */}
      <div className="text-[15px] text-skycred-gold-light font-semibold mb-1 relative z-10">
        {current.condition.text}
      </div>
      <div className="text-[13px] text-skycred-text-dim mb-5 relative z-10">
        Feels like {Math.round(current.feelslike_c)}°C
      </div>

      {/* Sky Credit Score / Mood Pill */}
      <div className="inline-flex items-center gap-2.5 bg-gradient-to-br from-[rgba(139,92,246,0.22)] to-[rgba(236,72,153,0.18)] border border-white/[0.12] px-4 py-2.5 rounded-2xl mb-5 relative z-10">
        <span className="text-xl">{mood.emoji}</span>
        <div>
          <div className="font-bold text-[14px] text-skycred-text">{mood.label}</div>
          <div className="text-[12px] text-skycred-text-dim mt-0.5">{mood.desc}</div>
        </div>
      </div>

      {/* Additional Metrics */}
      <WeatherMetrics
        humidity={current.humidity}
        windKph={current.wind_kph}
        uv={current.uv}
      />
    </div>
  );
};
