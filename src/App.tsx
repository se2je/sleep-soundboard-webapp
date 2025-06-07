import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import SoundCard from '@components/SoundCard';
import { soundStore } from '@stores/SoundStore';
import styles from '@styles/App.module.scss';

const App: React.FC = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [newSound, setNewSound] = useState({ name: '', url: '' });

  useEffect(() => {
    return () => {
      soundStore.cleanup();
    };
  }, []);

  const handleAddSound = (e: React.FormEvent) => {
    e.preventDefault();
    soundStore.addSound(newSound.name, newSound.url);
    setNewSound({ name: '', url: '' });
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sleep Soundboard</h1>
        <p>Mix and match sounds to create your perfect sleep environment</p>
      </header>

      <div className={styles.soundGrid}>
        {soundStore.sounds.map(sound => (
          <SoundCard
            key={sound.id}
            sound={sound}
            onToggle={() => soundStore.toggleSound(sound.id)}
            onVolumeChange={(volume) => soundStore.setVolume(sound.id, volume)}
          />
        ))}
      </div>

      <footer className={styles.footer}>
        <p>© Qyedo 2025 • Powered by <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">Netlify</a></p>
      </footer>

      <button className={styles.addSound} onClick={() => setShowModal(true)}>
        <Plus size={24} />
      </button>

      {showModal && (
        <>
          <div className={styles.overlay} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <h2>Add New Sound</h2>
            <form onSubmit={handleAddSound}>
              <input
                type="text"
                placeholder="Sound name"
                value={newSound.name}
                onChange={(e) => setNewSound(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                type="url"
                placeholder="Sound URL"
                value={newSound.url}
                onChange={(e) => setNewSound(prev => ({ ...prev, url: e.target.value }))}
                required
              />
              <button type="submit">Add Sound</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
});

export default App;