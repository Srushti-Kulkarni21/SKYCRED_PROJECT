import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-7">
      <div className="flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-skycred-gold to-skycred-purple flex items-center justify-center text-lg shadow-sm">
          ☁️
        </div>
        <div className="font-grotesk font-bold text-[19px] tracking-[0.5px]">
          SKY<span className="text-skycred-gold">CRED</span>
        </div>
      </div>
      <div className="text-[11px] text-skycred-text-dim border border-skycred-card-border px-2.5 py-1 rounded-full tracking-[0.5px] uppercase font-medium">
        Live Weather
      </div>
    </header>
  );
};
