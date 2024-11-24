import React from 'react';
import { GameState, GameStateManager } from '../game/state';

interface StartViewProps {
  onStartGame: () => void;
  onStartMaker: () => void;
  onLoadGame: (gameState: GameState) => void;
}

const StartView: React.FC<StartViewProps> = ({ onStartGame, onStartMaker, onLoadGame }) => {
  const handleLoadGame = async () => {
    const loadedState = await GameStateManager.loadFromFile();
    if (loadedState) {
      onLoadGame(loadedState);
    }
  };

  return (
    <div style={{ 
      textAlign: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }}>
      <h1 style={{ 
        fontSize: '72px', 
        marginBottom: '50px',
        color: '#333'
      }}>
        Leo's Labyrinth
      </h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={onStartGame}
          style={{
            padding: '15px 30px',
            fontSize: '20px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Start AI Game
        </button>
        <button 
          onClick={onStartMaker}
          style={{
            padding: '15px 30px',
            fontSize: '20px',
            cursor: 'pointer',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Be the Dungeon Master
        </button>
        <button 
          onClick={handleLoadGame}
          style={{
            padding: '15px 30px',
            fontSize: '20px',
            cursor: 'pointer',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Load Game
        </button>
      </div>
    </div>
  );
};

export default StartView;
