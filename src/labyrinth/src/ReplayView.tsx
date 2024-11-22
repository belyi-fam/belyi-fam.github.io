import React, { useState, useEffect, useRef } from 'react';
import { GameState } from '../game/state';
import { drawMap } from '../game/draw';

interface ReplayViewProps {
  gameState: GameState;
  onExit: () => void;
}

const ReplayView: React.FC<ReplayViewProps> = ({ gameState, onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Draw the state at the current turn
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.7;
      canvas.height = window.innerHeight * 0.6;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create a copy of the game state at this turn
        const currentState = { ...gameState };
        // Apply all moves up to the current turn
        currentState.gameResponses = gameState.gameResponses.slice(0, currentTurn);
        drawMap(currentState.map, ctx, currentState.players);
      }
    }
  }, [currentTurn, gameState]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentTurn < gameState.gameResponses.length - 1) {
        setCurrentTurn(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [currentTurn, playbackSpeed, isPlaying, gameState.gameResponses.length]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTurn(Number(e.target.value));
    setIsPlaying(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'auto'
    }}>
      <h1 style={{ fontSize: '48px', margin: '20px 0' }}>Game Replay</h1>
      <canvas
        ref={canvasRef}
        style={{ 
          backgroundColor: 'white',
          margin: '20px 0'
        }}
      />
      <div style={{ 
        width: '100%',
        padding: '20px',
        backgroundColor: 'white',
        position: 'sticky',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <input
            type="range"
            min="0"
            max={gameState.gameResponses.length - 1}
            value={currentTurn}
            onChange={handleSliderChange}
            style={{ width: '100%' }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginTop: '10px'
          }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                padding: '8px 16px',
                margin: '4px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => setPlaybackSpeed(prev => prev * 2)}
              style={{
                padding: '8px 16px',
                margin: '4px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {playbackSpeed}x Speed
            </button>
            <button
              onClick={onExit}
              style={{
                padding: '8px 16px',
                margin: '4px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Exit
            </button>
          </div>
        </div>
        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Turn {currentTurn + 1}: {gameState.gameResponses[currentTurn]?.message}
        </p>
      </div>
    </div>
  );
};

export default ReplayView; 