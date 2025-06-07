import React, { useCallback } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Sound } from '@types/sound';
import styles from './SoundCard.module.scss';

interface SoundCardProps {
  sound: Sound;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

const SoundCard: React.FC<SoundCardProps> = observer(({ sound, onToggle, onVolumeChange }) => {
  const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2544/2544-preview.mp3');
  clickSound.volume = 0.2; // Lower volume for the click sound

  const handleToggle = useCallback(() => {
    clickSound.currentTime = 0; // Reset the sound to start
    clickSound.play();
    onToggle();
  }, [onToggle]);

  return (
    <div className={`${styles.card} ${sound.isPlaying ? styles.playing : ''}`}>
      <div className={styles.info}>
        <span className={styles.icon}>{sound.icon}</span>
        <h3 className={styles.name}>{sound.name}</h3>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.volumeControl}>
          <Volume2 size={16} color="#d4d4d4" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={sound.volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            aria-label="Volume"
          />
        </div>
        
        <button
          className={`${styles.playButton} ${sound.isPlaying ? styles.playing : ''}`}
          onClick={handleToggle}
          aria-label={sound.isPlaying ? 'Stop' : 'Play'}
        >
          {sound.isPlaying ? <Square size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  );
});

export default SoundCard;