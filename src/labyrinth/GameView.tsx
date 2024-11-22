import React, { useState } from 'react';
import GameComponent from './index';
import Maker from './Maker';
import { Map } from './game/map';
import StartView from './src/StartView';

const GameView: React.FC = () => {
  const [view, setView] = useState<'menu' | 'game' | 'maker'>('menu');
  const [customMap, setCustomMap] = useState<Map | null>(null);

  if (view === 'game') {
    return <GameComponent initialMap={customMap} />;
  }

  if (view === 'maker') {
    return <Maker onStartGame={(map) => {
      setCustomMap(map);
      setView('game');
    }} />;
  }

  return (
    <StartView 
      onStartGame={() => setView('game')}
      onStartMaker={() => setView('maker')}
    />
  );
};

export default GameView; 