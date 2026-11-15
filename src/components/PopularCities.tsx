import React from 'react';

interface PopularCitiesProps {
  cities: string[];
  activeCity: string | null;
  onSelectCity: (city: string) => void;
  disabled: boolean;
}

export const PopularCities: React.FC<PopularCitiesProps> = ({
  cities,
  activeCity,
  onSelectCity,
  disabled,
}) => {
  return (
    <div className="mb-6">
      <div className="text-[12px] text-skycred-text-dim mx-0.5 mb-2.5 uppercase tracking-[1px] font-medium">
        Popular Cities
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => {
          const isActive = activeCity?.toLowerCase() === city.toLowerCase();
          return (
            <button
              key={city}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCity(city)}
              className={`px-4 py-2 rounded-full text-[13.5px] font-medium transition-all duration-200 select-none border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-gradient-to-br from-[rgba(243,201,105,0.18)] to-[rgba(139,92,246,0.18)] border-skycred-gold text-skycred-gold-light'
                  : 'bg-skycred-bg-elev border-skycred-card-border text-skycred-text-dim hover:border-skycred-gold hover:text-skycred-gold-light hover:-translate-y-0.5'
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
};
