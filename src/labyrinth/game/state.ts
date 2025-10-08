import { Map } from './map';
import { Player } from './player';
import { GameResponse } from './GameResponse';
import { Item } from './item';

export interface GameState {
  map: Map;
  players: Player[];
  currentPlayerIndex: number;
  turn: number;
  gameResponses: GameResponse[];
  winner?: Player;
}

export interface SerializedPlayer {
  name: string;
  color: string;
  x: number;
  y: number;
  bullets: number;
  hasTreasure: boolean;
}

export interface SerializedEdge {
  hasWall: boolean;
  isOutsideWall: boolean;
  isExit: boolean;
}

export interface SerializedItem {
  x: number;
  y: number;
  type: string;
  amount: number;
}

export interface SerializedMap {
  size: number;
  grid: SerializedEdge[][][];  // [y][x][direction]
  exitPosition: { x: number; y: number };
  treasurePosition: { x: number; y: number } | null;
  items: SerializedItem[];
}

export interface SerializedGameState {
  map: SerializedMap;
  players: SerializedPlayer[];
  currentPlayerIndex: number;
  turn: number;
  gameResponses: { player: string; message: string }[];
  winner?: string;
}

export class GameStateManager {
  static serializeState(state: GameState): SerializedGameState {
    return {
      map: {
        size: state.map.size,
        grid: state.map.grid.map(row => 
          row.map(space => 
            space.edges.map(edge => edge ? {
              hasWall: edge.hasWall,
              isOutsideWall: edge.isOutsideWall,
              isExit: edge.isExit
            } : null)
          )
        ),
        exitPosition: state.map.exitPosition,
        treasurePosition: state.map.treasure ? {
          x: state.map.treasure.x,
          y: state.map.treasure.y
        } : null,
        items: state.map.items.map(item => ({
          x: item.x,
          y: item.y,
          type: item.type,
          amount: item.amount
        }))
      },
      players: state.players.map(player => ({
        name: player.name,
        color: player.color,
        x: player.x,
        y: player.y,
        bullets: player.bullets,
        hasTreasure: player.hasTreasure
      })),
      currentPlayerIndex: state.currentPlayerIndex,
      turn: state.turn,
      gameResponses: state.gameResponses.map(response => ({
        player: response.player.name,
        message: response.message
      })),
      winner: state.winner?.name
    };
  }

  static deserializeState(serialized: SerializedGameState): GameState {
    const map = new Map(serialized.map.size);
    
    // Restore map state
    serialized.map.grid.forEach((row, i) => {
      row.forEach((spaceEdges, j) => {
        spaceEdges.forEach((edgeData, dir) => {
          if (edgeData && map.grid[i][j].edges[dir]) {
            map.grid[i][j].edges[dir]!.hasWall = edgeData.hasWall;
            map.grid[i][j].edges[dir]!.isOutsideWall = edgeData.isOutsideWall;
            map.grid[i][j].edges[dir]!.isExit = edgeData.isExit;
          }
        });
      });
    });

    map.exitPosition = serialized.map.exitPosition;
    if (serialized.map.treasurePosition) {
      map.treasure = {
        x: serialized.map.treasurePosition.x,
        y: serialized.map.treasurePosition.y,
        clone: function() { return this; }
      };
    }

    // Deserialize items
    map.items = serialized.map.items.map(itemData => ({
      x: itemData.x,
      y: itemData.y,
      type: itemData.type as 'bullet',
      amount: itemData.amount
    }));

    // Restore players
    const players = serialized.players.map(p => {
      const player = new Player(p.name, p.x, p.y, p.color);
      player.bullets = p.bullets;
      player.hasTreasure = p.hasTreasure;
      return player;
    });

    // Restore game responses
    const gameResponses = serialized.gameResponses.map(response => {
      const player = players.find(p => p.name === response.player)!;
      return new GameResponse(player, response.message);
    });

    return {
      map,
      players,
      currentPlayerIndex: serialized.currentPlayerIndex,
      turn: serialized.turn,
      gameResponses,
      winner: serialized.winner ? players.find(p => p.name === serialized.winner) : undefined
    };
  }

  static saveToFile(state: GameState) {
    const serialized = this.serializeState(state);
    const blob = new Blob([JSON.stringify(serialized, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'labyrinth-game.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async loadFromFile(): Promise<GameState | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const serialized = JSON.parse(e.target?.result as string);
            const state = this.deserializeState(serialized);
            resolve(state);
          } catch (error) {
            console.error('Error loading game state:', error);
            resolve(null);
          }
        };
        reader.readAsText(file);
      };

      input.click();
    });
  }
} 