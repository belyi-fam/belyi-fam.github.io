import React, { useRef, useEffect, useState } from 'react';
import { Map } from './game/map';
import { MAZE_CONSTANTS } from './game/constants';
import { drawMap } from './game/draw';

interface MakerProps {
  onStartGame: (map: Map) => void;
}

const Maker: React.FC<MakerProps> = ({ onStartGame }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [map, setMap] = useState<Map>(new Map(MAZE_CONSTANTS.MAP_SIZE));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawMap(map, ctx, []);
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.7;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawMap(map, ctx, []);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert click coordinates to grid coordinates
    const cellSize = Math.min(canvas.width, canvas.height) * 0.9 / map.size;
    const offsetX = (canvas.width - map.size * cellSize) / 2;
    const offsetY = (canvas.height - map.size * cellSize) / 2;

    const gridX = Math.floor((x - offsetX) / cellSize);
    const gridY = Math.floor((y - offsetY) / cellSize);

    // Determine if click was closer to vertical or horizontal edge
    const relX = (x - offsetX) % cellSize;
    const relY = (y - offsetY) % cellSize;
    
    const edgeThreshold = cellSize * 0.2; // 20% of cell size for edge detection

    if (gridX >= 0 && gridX < map.size && gridY >= 0 && gridY < map.size) {
      let direction = -1;
      
      if (relX < edgeThreshold) direction = 3; // Left edge
      else if (relX > cellSize - edgeThreshold) direction = 1; // Right edge
      else if (relY < edgeThreshold) direction = 0; // Top edge
      else if (relY > cellSize - edgeThreshold) direction = 2; // Bottom edge

      if (direction !== -1) {
        const newMap = map.clone();
        const edge = newMap.grid[gridY][gridX].edges[direction];
        
        if (edge && !edge.isOutsideWall) {
          edge.hasWall = !edge.hasWall;
          
          // Update adjacent cell's corresponding edge
          let [adjY, adjX] = [gridY, gridX];
          switch (direction) {
            case 0: adjY--; break;
            case 1: adjX++; break;
            case 2: adjY++; break;
            case 3: adjX--; break;
          }
          
          if (adjX >= 0 && adjX < map.size && adjY >= 0 && adjY < map.size) {
            newMap.grid[adjY][adjX].edges[(direction + 2) % 4]!.hasWall = edge.hasWall;
          }
        }
        
        setMap(newMap);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Map Editor</h1>
      <p style={{ marginBottom: '20px' }}>Click near edges to toggle walls</p>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ 
          border: '1px solid black', 
          margin: '20px 0',
          backgroundColor: 'white'
        }}
      />
      <button
        onClick={() => onStartGame(map)}
        style={{
          padding: '15px 30px',
          fontSize: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Maker; 