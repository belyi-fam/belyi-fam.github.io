export const MAZE_CONSTANTS = {
  WALL_REMOVAL_CHANCE: 0.15,  // 15% chance to remove walls in maze generation
  MAP_SIZE: 10,
  STARTING_BULLETS: 3,
  BOARD_SIZE_MULTIPLIER: 0.8,  // Increased from 0.7
  CONTROLS_MARGIN: '5px',      // Decreased from '10px'
};

export const PLAYER_CONSTANTS = {
  NAMES: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Bear', 'Ghost'],
  COLORS: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', '#666'],
  BEAR_INDEX: 6,  // The index of the Bear in the NAMES array
  GHOST_INDEX: 7,
  // Helper to check if a player is an NPC (Bear or Ghost)
  isNPC: (index: number) => index === 6 || index === 7
};
