import React, { useState } from 'react';
import GameView from '../src/labyrinth/src/GameView';
import Maker from '../src/labyrinth/Maker';

const Home: React.FC = () => {
  const [view, setView] = useState<'home' | 'game' | 'maker'>('home');

  if (view === 'game') {
    return <GameView />;
  } else if (view === 'maker') {
    return <Maker onStartGame={() => setView('game')} />;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', marginTop: '50px' }}>Leo's Labyrinth</h1>
      <button onClick={() => setView('game')}>Play AI Game</button>
      <button onClick={() => setView('maker')}>Be the Dungeon Master</button>
    </div>
  );
};

export default Home;
