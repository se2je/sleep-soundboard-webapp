import { makeAutoObservable, runInAction } from 'mobx';
// @ts-expect-error/conflict
import { Sound } from '@types/sound';
import { soundsList } from '@data/sounds';

class SoundStore {
  sounds: Sound[] = soundsList;
  private audioElements: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    makeAutoObservable(this);
    this.initializeAudio();
  }

  private initializeAudio() {
    this.sounds.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = sound.volume;
      this.audioElements[sound.id] = audio;
    });
  }

  toggleSound(id: string) {
    const soundIndex = this.sounds.findIndex(s => s.id === id);
    if (soundIndex === -1) return;

    const audio = this.audioElements[id];
    if (!audio) return;

    runInAction(() => {
      if (!this.sounds[soundIndex].isPlaying) {
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
      this.sounds[soundIndex].isPlaying = !this.sounds[soundIndex].isPlaying;
    });
  }

  setVolume(id: string, volume: number) {
    const soundIndex = this.sounds.findIndex(s => s.id === id);
    if (soundIndex === -1) return;

    const audio = this.audioElements[id];
    if (!audio) return;

    runInAction(() => {
      this.sounds[soundIndex].volume = volume;
      audio.volume = volume;
    });
  }

  addSound(name: string, url: string) {
    const newId = String(this.sounds.length + 1);
    const newSound: Sound = {
      id: newId,
      name,
      url,
      icon: '🎵',
      volume: 0.5,
      isPlaying: false
    };

    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = newSound.volume;
    this.audioElements[newId] = audio;

    runInAction(() => {
      this.sounds.push(newSound);
    });
  }

  cleanup() {
    Object.values(this.audioElements).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

export const soundStore = new SoundStore();