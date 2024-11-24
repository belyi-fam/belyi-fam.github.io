import React, { useState } from 'react';
import GameComponent from './GameComponent';
import Maker from './Maker';
import { Map } from '../game/map';
import StartView from './StartView';
import { GameState } from '../game/state';

const GameView: React.FC = () => {
  const [view, setView] = useState<'menu' | 'game' | 'maker'>('menu');
  const [customMap, setCustomMap] = useState<Map | undefined>(undefined);
  const [loadedGameState, setLoadedGameState] = useState<GameState | undefined>(undefined);

  if (view === 'game') {
    return (
      <GameComponent 
        initialMap={customMap} 
        loadedGameState={loadedGameState}
      />
    );
  }

  if (view === 'maker') {
    return (
      <Maker 
        onStartGame={(map: Map) => {
          setCustomMap(map);
          setView('game');
        }} 
      />
    );
  }

  return (
    <StartView 
      onStartGame={() => {
        setLoadedGameState(undefined);
        setCustomMap(undefined);
        setView('game');
      }}
      onStartMaker={() => setView('maker')}
      onLoadGame={(gameState: GameState) => {
        setLoadedGameState(gameState);
        setView('game');
      }}
    />
  );
};

export default GameView; 