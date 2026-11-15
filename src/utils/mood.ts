import { WeatherMood } from '../types/weather';

export function getSkyCreditMood(
  tempC: number,
  humidity: number,
  windKph: number
): WeatherMood {
  if (tempC >= 36) {
    return {
      emoji: '🔥',
      label: 'Scorching Mode',
      desc: 'Blazing hot — hydrate and stay indoors.',
    };
  }
  if (tempC <= 8) {
    return {
      emoji: '🥶',
      label: 'Freeze Frame',
      desc: 'Bone-chilling cold — bundle up tight.',
    };
  }
  if (tempC >= 20 && tempC <= 28 && humidity < 60 && windKph < 15) {
    return {
      emoji: '😎',
      label: 'Blissful & Breezy',
      desc: 'Textbook perfect weather — ideal for stepping out.',
    };
  }
  if (humidity >= 80) {
    return {
      emoji: '💦',
      label: 'Sticky Situation',
      desc: 'Heavy, humid air — expect high moisture.',
    };
  }
  if (windKph >= 30) {
    return {
      emoji: '🌪️',
      label: 'Wild & Windy',
      desc: 'Strong gusts — hold onto light items.',
    };
  }
  if (tempC > 28) {
    return {
      emoji: '☀️',
      label: 'Warm & Sunny',
      desc: 'Pleasant warmth, light breathable layers work best.',
    };
  }
  if (tempC < 20) {
    return {
      emoji: '🧥',
      label: 'Cool & Crisp',
      desc: 'A light jacket or sweater will serve you well.',
    };
  }
  return {
    emoji: '🙂',
    label: 'Mild Mood',
    desc: 'Nothing extreme — a balanced and comfortable day ahead.',
  };
}
