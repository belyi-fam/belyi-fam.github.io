import React, { useRef, useEffect, useState } from 'react';
import { Game } from '../game/game';
import { Map } from '../game/map';
import { Player } from '../game/player';
import { drawMap } from '../game/draw';

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
        const mapSize = 10;
        const map = new Map(mapSize);

        // Create Players
        const playerNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
        const playerColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const players: Player[] = [];

        for (let i = 0; i < playerNames.length; i++) {
          const name = playerNames[i];
          const color = playerColors[i];
          const x = Math.floor(Math.random() * mapSize);
          const y = Math.floor(Math.random() * mapSize);
          players.push(new Player(name, x, y, color));
        }

        const gameInstance = new Game(map, players);
        setGame(gameInstance);
        gameRef.current = gameInstance;
        setCurrentPlayer(gameInstance.getCurrentPlayer());

        if (gameRef.current) {
          drawMap(gameRef.current.map, ctx, gameRef.current.players);
        }
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

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Labyrinth; 