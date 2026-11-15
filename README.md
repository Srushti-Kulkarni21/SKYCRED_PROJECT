# SKYCRED – Live Weather Web Application

A sleek, CRED-inspired weather web application built with **React**, **TypeScript**, and **Tailwind CSS**. SKYCRED allows users to search any global city, view real-time weather metrics, check the sky's "credit score" mood indicator, and inspect or copy raw and formatted JSON API responses.

Reference: [cred-weather-zeta.vercel.app](https://cred-weather-zeta.vercel.app/)

---

## ✨ Features

- **CRED-style Dark Aesthetic**: Luxury dark theme with Space Grotesk and Inter typography, subtle glassmorphic borders, and ambient gradients.
- **City Search & Popular Cities**: Instant search with Enter key support plus one-click access to top global cities (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, New York, London).
- **Weather Metrics**:
  - Live temperature (°C) & Feels-like temperature
  - Weather condition and dynamic condition icon
  - Sky Credit Mood / Score indicator (e.g. *Scorching Mode*, *Blissful & Breezy*, *Cool & Crisp*)
  - Humidity percentage (%)
  - Wind speed (kph)
  - UV Index
- **JSON Inspector**:
  - Formatted JSON tab with clean indentation
  - Raw JSON tab preserving original API response
  - One-click copy with feedback toast
- **Secure Backend Layer**: Serverless endpoint `/api/weather` keeps your WeatherAPI key completely safe from browser exposure.
- **Vercel Ready**: Native serverless function (`api/weather.ts`) and zero-config deployment.

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### 2. Installation

```bash
git clone https://github.com/Srushti-Kulkarni21/SKYCRED_PROJECT.git
cd SKYCRED_PROJECT
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
WEATHERAPI_KEY=your_actual_weatherapi_key
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub (`Srushti-Kulkarni21/SKYCRED_PROJECT`).
2. Go to [Vercel](https://vercel.com/) and click **Add New** → **Project**.
3. Import your `SKYCRED_PROJECT` repository.
4. Under **Environment Variables**, add:
   - **Key**: `WEATHERAPI_KEY`
   - **Value**: Your WeatherAPI key
5. Click **Deploy**. Vercel will build the frontend with Vite and automatically deploy the serverless backend function at `/api/weather`.

---

## 🔒 Security

- The WeatherAPI key is strictly read from `process.env.WEATHERAPI_KEY` inside the server-side function (`api/weather.ts`).
- No API keys are bundled or exposed to frontend code or client network calls.
- `.env` files are included in `.gitignore` to prevent secret leakage.

---

## 📄 License

MIT
