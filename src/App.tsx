import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PopularCities } from './components/PopularCities';
import { WeatherCard } from './components/WeatherCard';
import { JsonViewer } from './components/JsonViewer';
import { StatusMessage } from './components/StatusMessage';
import { WeatherApiResponse } from './types/weather';

const POPULAR_CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'New York',
  'London',
];

export const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>('Mumbai');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingCity, setLoadingCity] = useState<string>('');

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingCity(city);
    // As per PRD requirement: clear prior weather card so stale data is not mistaken for a failed search
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to fetch weather for this city.');
      }

      setWeatherData(data);
      setActiveCity(city);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Network error or service unavailable. Please check your connection.';
      setError(message);
      setActiveCity(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load with default popular city
    fetchWeather('Mumbai');
  }, []);

  return (
    <div className="max-w-[560px] mx-auto px-4 py-7 pb-20">
      {/* Branding & Header */}
      <Header />

      {/* Main Tagline */}
      <h1 className="font-grotesk text-[26px] leading-[1.25] font-semibold mb-5.5 text-skycred-text">
        Check the sky's{' '}
        <span className="bg-gradient-to-r from-skycred-gold-light to-skycred-purple bg-clip-text text-transparent">
          credit score
        </span>{' '}
        before you step out.
      </h1>

      {/* City Search Bar */}
      <SearchBar onSearch={(city) => fetchWeather(city)} isLoading={isLoading} />

      {/* Popular Cities Chips */}
      <PopularCities
        cities={POPULAR_CITIES}
        activeCity={activeCity}
        onSelectCity={(city) => fetchWeather(city)}
        disabled={isLoading}
      />

      {/* Loading and Error Feedback */}
      <StatusMessage isLoading={isLoading} error={error} loadingCity={loadingCity} />

      {/* Weather Display Card */}
      {weatherData && !isLoading && (
        <>
          <WeatherCard data={weatherData} />
          <JsonViewer data={weatherData} />
        </>
      )}

      {/* Footer */}
      <footer className="text-center mt-10 text-skycred-text-faint text-[11.5px]">
        Powered by{' '}
        <a
          href="https://www.weatherapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-skycred-text-dim hover:text-skycred-gold transition-colors"
        >
          WeatherAPI.com
        </a>{' '}
        · Not a real credit score, just vibes.
      </footer>
    </div>
  );
};

export default App;
