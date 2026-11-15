import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'vite-dev-weather-api-proxy',
        configureServer(server) {
          server.middlewares.use('/api/weather', async (req, res) => {
            const urlObj = new URL(req.url || '', 'http://localhost');
            const city = urlObj.searchParams.get('city');

            if (!city) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'City name parameter is required.' }));
              return;
            }

            const apiKey = env.WEATHERAPI_KEY || process.env.WEATHERAPI_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error:
                    'WeatherAPI key is missing. Set WEATHERAPI_KEY in your .env or Vercel environment variables.',
                })
              );
              return;
            }

            try {
              const upstream = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(
                apiKey
              )}&q=${encodeURIComponent(city)}&aqi=no`;

              const apiRes = await fetch(upstream);
              const data = await apiRes.json();

              res.statusCode = apiRes.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch weather from WeatherAPI.' }));
            }
          });
        },
      },
    ],
  };
});
