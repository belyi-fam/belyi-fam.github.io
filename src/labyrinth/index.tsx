import React, { useRef, useEffect, useState } from 'react';
import { Map } from './game/map';
import { Player } from './game/player';
import { Game } from './game/game';
import { GameResponse } from './game/GameResponse';
import { drawMap } from './game/draw';
import { MAZE_CONSTANTS, PLAYER_CONSTANTS } from './game/constants';
import { GameStateManager, GameState } from './game/state';
import StartView from './src/StartView';
import ReplayView from './src/ReplayView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp, 
  faArrowDown, 
  faArrowLeft, 
  faArrowRight,
  faBullseye  // or faCrosshairs or faCircleDot for bullet icon
} from '@fortawesome/free-solid-svg-icons';

const GameComponent: React.FC<{ initialMap?: Map }> = ({ initialMap }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [lastResponse, setLastResponse] = useState<GameResponse | null>(null);
  const gameRef = useRef<Game | null>(null);
  const [view, setView] = useState<'start' | 'game' | 'victory' | 'replay'>('start');
  const [victor, setVictor] = useState<Player | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (view !== 'game') return;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.7;
      canvas.height = window.innerHeight * 0.6;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const map = initialMap || new Map(MAZE_CONSTANTS.MAP_SIZE);
        const players: Player[] = [];

        for (let i = 0; i < PLAYER_CONSTANTS.NAMES.length; i++) {
          const name = PLAYER_CONSTANTS.NAMES[i];
          const color = PLAYER_CONSTANTS.COLORS[i];
          const x = Math.floor(Math.random() * MAZE_CONSTANTS.MAP_SIZE);
          const y = Math.floor(Math.random() * MAZE_CONSTANTS.MAP_SIZE);
          players.push(new Player(name, x, y, color));
        }

        const gameInstance = new Game(map, players);
        setGame(gameInstance);
        gameRef.current = gameInstance;
        setCurrentPlayer(gameInstance.getCurrentPlayer());

        drawMap(map, ctx, players);
      }
    }
  }, [view, initialMap]);

  useEffect(() => {
    if (game) {
      const winner = game.checkVictory();
      if (winner) {
        setVictor(winner);
        setView('victory');
      }
    }
  }, [game?.turn]);

  const handleAction = (action: 'move' | 'shoot', direction: number) => {
    if (game && !isAnimating) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        let response: GameResponse;
        setIsAnimating(true);
        
        if (action === 'move') {
          response = game.movePlayer(direction);
          
          const winner = game.checkVictory();
          if (winner) {
            setVictor(winner);
            setView('victory');
            return;
          }
        } else {
          response = game.shoot(direction);
        }
        
        setCurrentPlayer(game.getCurrentPlayer());
        setLastResponse(response);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const keyMap: { [key: string]: number } = {
      ArrowUp: 0,
      ArrowRight: 1,
      ArrowDown: 2,
      ArrowLeft: 3,
    };
    if (e.key in keyMap) {
      handleAction('move', keyMap[e.key]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number = 0;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      
      if (ctx && game) {
        const isStillAnimating = game.getAnimator().animate(timestamp - lastTimestamp, ctx, game.map, game.players);
        if (isStillAnimating) {
          lastTimestamp = timestamp;
          animationFrameId = requestAnimationFrame(animate);
        } else {
          drawMap(game.map, ctx, game.players);
          setIsAnimating(false);
        }
      }
    };

    if (isAnimating && game) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    if (view === 'victory' && canvasRef.current && game) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.6;
        drawMap(game.map, ctx, game.players);
      }
    }
  }, [view, game]);

  const saveCurrentGame = () => {
    if (game) {
      const gameState: GameState = {
        map: game.map,
        players: game.players,
        currentPlayerIndex: game.currentPlayerIndex,
        turn: game.turn,
        gameResponses: game.gameResponses,
        winner: victor
      };
      GameStateManager.saveToFile(gameState);
    }
  };

  if (view === 'start') {
    return <StartView 
      onStartGame={() => setView('game')}
      onStartMaker={() => {/* Handle maker view */}}
    />;
  }

  if (view === 'replay') {
    return <ReplayView 
      gameResponses={game?.gameResponses || []}
      onExit={() => setView('start')}
    />;
  }

  if (view === 'victory') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '20px',
          color: victor?.color 
        }}>
          {victor?.name} Wins!
        </h1>
        <canvas
          ref={canvasRef}
          style={{ 
            backgroundColor: 'white',
            margin: '20px 0'
          }}
        />
        <button
          onClick={() => setView('replay')}
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
          Watch Replay
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {lastResponse && (
        <div style={{ 
          width: '300px',
          padding: '20px',
          overflowY: 'auto',
          height: '100vh',
          borderRight: '1px solid #eee'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            marginBottom: '10px',
            color: '#333'
          }}>
            Game Response:
          </h2>
          <p style={{ 
            marginBottom: '10px',
            color: '#666'
          }}>
            {lastResponse.message}
          </p>
          <pre style={{ 
            fontSize: '12px', 
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: 'calc(100vh - 200px)'
          }}>
            {JSON.stringify(lastResponse, null, 2)}
          </pre>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: '20px'
      }}>
        <div style={{ 
          padding: '10px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '36px',
            color: currentPlayer?.color,
            marginBottom: '5px'
          }}>
            {currentPlayer ? `Game Turn: ${game?.turn} - ${currentPlayer.name}'s Turn` : 'Loading...'}
          </h1>
          <button
            onClick={saveCurrentGame}
            style={{
              padding: '5px 10px',
              fontSize: '14px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Save Game
          </button>
        </div>

        <canvas
          ref={canvasRef}
          style={{ 
            backgroundColor: 'white',
            margin: '10px 0'
          }}
        />

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(5, auto)',
          gap: '5px',
          padding: '10px',
          backgroundColor: 'white',
        }}>
          <div style={{ gridColumn: 3, gridRow: 1 }}>
            <button
              style={{ 
                padding: '12px 16px',
                backgroundColor: currentPlayer?.bullets === 0 ? '#ccc' : '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPlayer?.bullets === 0 ? 'not-allowed' : 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('shoot', 0)}
              disabled={currentPlayer?.bullets === 0}
            >
              <FontAwesomeIcon icon={faBullseye} size="lg" transform={{ rotate: 0 }} />
            </button>
          </div>
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <button 
              style={{ 
                padding: '12px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('move', 0)}
            >
              <FontAwesomeIcon icon={faArrowUp} size="lg" />
            </button>
          </div>
          <div style={{ gridColumn: 1, gridRow: 3 }}>
            <button
              style={{ 
                padding: '12px 16px',
                backgroundColor: currentPlayer?.bullets === 0 ? '#ccc' : '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPlayer?.bullets === 0 ? 'not-allowed' : 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('shoot', 3)}
              disabled={currentPlayer?.bullets === 0}
            >
              <FontAwesomeIcon icon={faBullseye} size="lg" transform={{ rotate: -90 }} />
            </button>
          </div>
          <div style={{ 
            gridColumn: '2 / span 3',
            gridRow: 3,
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <button 
              style={{ 
                padding: '12px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('move', 3)}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <div style={{ width: '50px' }} />
            <button 
              style={{ 
                padding: '12px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('move', 1)}
            >
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </button>
          </div>
          <div style={{ gridColumn: 5, gridRow: 3 }}>
            <button
              style={{ 
                padding: '12px 16px',
                backgroundColor: currentPlayer?.bullets === 0 ? '#ccc' : '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPlayer?.bullets === 0 ? 'not-allowed' : 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('shoot', 1)}
              disabled={currentPlayer?.bullets === 0}
            >
              <FontAwesomeIcon icon={faBullseye} size="lg" transform={{ rotate: 90 }} />
            </button>
          </div>
          <div style={{ gridColumn: 3, gridRow: 4 }}>
            <button 
              style={{ 
                padding: '12px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('move', 2)}
            >
              <FontAwesomeIcon icon={faArrowDown} size="lg" />
            </button>
          </div>
          <div style={{ gridColumn: 3, gridRow: 5 }}>
            <button
              style={{ 
                padding: '12px 16px',
                backgroundColor: currentPlayer?.bullets === 0 ? '#ccc' : '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPlayer?.bullets === 0 ? 'not-allowed' : 'pointer',
                width: '50px',
                height: '50px'
              }}
              onClick={() => handleAction('shoot', 2)}
              disabled={currentPlayer?.bullets === 0}
            >
              <FontAwesomeIcon icon={faBullseye} size="lg" transform={{ rotate: 180 }} />
            </button>
          </div>
          <div style={{ 
            gridColumn: '1 / span 5',
            textAlign: 'center',
            marginTop: '10px'
          }}>
            <p>Bullet Count: {currentPlayer?.bullets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
