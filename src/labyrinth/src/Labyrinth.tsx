import React, { useRef, useEffect, useState } from 'react';
import { Game } from '../game/Game';
import { drawMap } from '../game/draw';
import { Player } from '../game/player';

const Labyrinth: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.9;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // ... initialization code ...

        setGame(gameInstance);
        gameRef.current = gameInstance;
        setCurrentPlayer(gameInstance.getCurrentPlayer());

        drawMap(gameRef.current.map, ctx, gameRef.current.players);
      }
    }

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.9;
        const ctx = canvas.getContext('2d');
        if (ctx && gameRef.current) {
          drawMap(gameRef.current.map, ctx, gameRef.current.players);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ... existing code ...
};

export default Labyrinth; 