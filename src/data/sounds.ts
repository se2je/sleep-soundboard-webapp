// @ts-ignore
import { Sound } from '@types/sound';
import heater from '@audio/heater.mp3';
import rain from '@audio/rain.ogg';
import wind from '@audio/wind.wav';
import campfire from '@audio/campfire.wav';
export const soundsList: Sound[] = [
  {
    id: '1',
    name: 'Heater',
    url: heater,
    icon: '🔥',
    volume: 0.5,
    isPlaying: false
  },
  {
    id: '2',
    name: 'Rain',
    url: rain,
    icon: '🌧️',
    volume: 0.5,
    isPlaying: false
  },
  {
    id: '3',
    name: 'Underground machine',
    url: 'https://assets.mixkit.co/active_storage/sfx/2510/2510-preview.mp3',
    icon: '🏭️',
    volume: 0.5,
    isPlaying: false
  },
  {
    id: '4',
    name: 'Wind',
    url: wind,
    icon: '💨',
    volume: 0.5,
    isPlaying: false
  },
  {
    id: '5',
    name: 'Campfire',
    url: campfire,
    icon: '🔥',
    volume: 0.5,
    isPlaying: false
  }
];