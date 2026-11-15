import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { city } = req.query;

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    return res.status(400).json({ error: 'City name parameter is required.' });
  }

  const apiKey = process.env.WEATHERAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        'WeatherAPI key is not configured on the server. Please set WEATHERAPI_KEY in Vercel Project Settings → Environment Variables.',
    });
  }

  try {
    const upstreamUrl = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(
      apiKey
    )}&q=${encodeURIComponent(city.trim())}&aqi=no`;

    const weatherRes = await fetch(upstreamUrl);
    const data = await weatherRes.json();

    if (!weatherRes.ok) {
      const errorMessage =
        data?.error?.message ||
        (weatherRes.status === 400
          ? 'City not found. Please check spelling.'
          : 'Unable to fetch weather data.');
      return res.status(weatherRes.status).json({ error: errorMessage });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to communicate with WeatherAPI provider. Please try again later.',
    });
  }
}
