import { Map } from './map';
import { Player } from './player';
import { GameResponse } from './GameResponse';
import { Animator } from './animate';
import { MAZE_CONSTANTS, PLAYER_CONSTANTS } from './constants';

export class Game {
  map: Map;
  players: Player[];
  currentPlayerIndex: number;
  turn: number;
  gameResponses: GameResponse[];
  previousStates: Array<{ map: Map; players: Player[]; turn: number }>;
  private animator: Animator = new Animator();

  private readonly directionNames = ['up', 'right', 'down', 'left'];

  constructor(map: Map, players: Player[]) {
    this.map = map;
    this.players = [];
    this.currentPlayerIndex = 0;
    this.turn = 1;
    this.gameResponses = [];
    this.previousStates = [];

    // Spawn players safely one by one
    const occupiedPositions = [];
    if (map.treasure) {
      occupiedPositions.push({ x: map.treasure.x, y: map.treasure.y });
    }

    for (const playerTemplate of players) {
      const safePos = map.findSafeSpawnPosition(occupiedPositions);
      const player = new Player(
        playerTemplate.name,
        safePos.x,
        safePos.y,
        playerTemplate.color
      );
      this.players.push(player);
      occupiedPositions.push(safePos);
    }
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  nextTurn() {
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      if (this.currentPlayerIndex === 0) {
        this.turn += 1;
      }
    } while (PLAYER_CONSTANTS.isNPC(this.currentPlayerIndex)); // Skip NPC turns
  }

  movePlayer(direction: number): GameResponse {
    this.saveState();
    const player = this.getCurrentPlayer();
    const directionName = this.directionNames[direction];
    const bear = this.players[PLAYER_CONSTANTS.BEAR_INDEX];
    const ghost = this.players[PLAYER_CONSTANTS.GHOST_INDEX];

    // Store starting positions for animation
    const startX = player.x;
    const startY = player.y;
    const bearStartX = bear.x;
    const bearStartY = bear.y;
    const ghostStartX = ghost.x;
    const ghostStartY = ghost.y;

    let response: GameResponse;

    // Handle player movement
    if (player.isOutside(this.map.size)) {
      const exitDir = this.getExitDirection();
      if (direction === (exitDir + 2) % 4) {
        const [newX, newY] = this.getPositionFromExit();
        player.x = newX;
        player.y = newY;
        response = new GameResponse(player, `${player.name} moved back into the labyrinth.`);
        response.setMove('move', directionName);
        this.gameResponses.push(response);
        this.nextTurn();
        return response;
      } else {
        response = new GameResponse(player, `${player.name} can only move back through the exit.`);
        response.setMove('move', directionName);
        this.gameResponses.push(response);
        this.nextTurn();
        return response;
      }
    }

    const { x, y } = player;
    const space = this.map.grid[y][x];
    const edge = space.edges[direction];

    // Move the player if possible
    let playerMoved = false;
    if (edge && !edge.hasWall) {
      let newX = x;
      let newY = y;

      switch (direction) {
        case 0: newY -= 1; break;
        case 1: newX += 1; break;
        case 2: newY += 1; break;
        case 3: newX -= 1; break;
      }

      // Update player position
      if (edge.isExit) {
        player.x = newX;
        player.y = newY;
        playerMoved = true;
      } else if (newX >= 0 && newX < this.map.size && newY >= 0 && newY < this.map.size) {
        player.x = newX;
        player.y = newY;
        playerMoved = true;
      } else {
        player.x = -1;
        player.y = -1;
        playerMoved = true;
      }
    }

    // Move NPCs regardless of player's move success
    if (player !== bear && player !== ghost) {
      // Move bear if there's no wall
      const bearSpace = this.map.grid[bear.y][bear.x];
      const bearEdge = bearSpace.edges[direction];
      
      if (bearEdge && !bearEdge.hasWall) {
        let bearNewX = bear.x;
        let bearNewY = bear.y;
        
        switch (direction) {
          case 0: bearNewY -= 1; break;
          case 1: bearNewX += 1; break;
          case 2: bearNewY += 1; break;
          case 3: bearNewX -= 1; break;
        }

        if (bearNewX >= 0 && bearNewX < this.map.size && 
            bearNewY >= 0 && bearNewY < this.map.size) {
          bear.x = bearNewX;
          bear.y = bearNewY;
          this.animator.addMovement(bear, bearStartX, bearStartY, bearNewX, bearNewY);
        }
      }

      // Move ghost (ignores walls)
      let ghostNewX = ghost.x;
      let ghostNewY = ghost.y;
      
      switch (direction) {
        case 0: ghostNewY -= 1; break;
        case 1: ghostNewX += 1; break;
        case 2: ghostNewY += 1; break;
        case 3: ghostNewX -= 1; break;
      }

      if (ghostNewX >= 0 && ghostNewX < this.map.size && 
          ghostNewY >= 0 && ghostNewY < this.map.size) {
        ghost.x = ghostNewX;
        ghost.y = ghostNewY;
        this.animator.addMovement(ghost, ghostStartX, ghostStartY, ghostNewX, ghostNewY);
      }
    }

    // Create appropriate response based on player's move
    if (playerMoved) {
      response = new GameResponse(player, `${player.name} successfully moved ${directionName}`);
      this.animator.addMovement(player, startX, startY, player.x, player.y);
    } else {
      response = new GameResponse(player, `${player.name} tried to move ${directionName} but hit a wall.`);
    }
    response.setMove('move', directionName);

    // Handle treasure pickup
    if (playerMoved && this.map.treasure && player.x === this.map.treasure.x && player.y === this.map.treasure.y) {
      player.hasTreasure = true;
      this.map.treasure = null;
      response.message += ` ${player.name} picked up the treasure!`;
    }

    // Check for close encounters
    this.checkCloseEncounters(response);

    // Handle encounters for player and NPCs
    this.handleEncounters(player, response);
    if (player !== bear && player !== ghost) {
      this.handleNPCEncounters(response);
    }

    this.gameResponses.push(response);
    this.nextTurn();
    return response;
  }

  shoot(direction: number): GameResponse {
    this.saveState();
    const player = this.getCurrentPlayer();
    const directionName = this.directionNames[direction];

    if (player.isOutside(this.map.size)) {
      const exitDir = this.getExitDirection();
      if (direction !== (exitDir + 2) % 4) {
        const response = new GameResponse(
          player,
          `${player.name} can only shoot back through the exit.`
        );
        response.setMove('shoot', directionName);
        this.gameResponses.push(response);
        this.nextTurn();
        return response;
      }
    }

    if (player.bullets <= 0) {
      const response = new GameResponse(
        player,
        `${player.name} tried to shoot ${directionName} but has no bullets.`
      );
      response.setMove('shoot', directionName);
      this.gameResponses.push(response);
      this.nextTurn();
      return response;
    }

    player.bullets -= 1;

    let targetX = player.x;
    let targetY = player.y;
    const bulletPath = [{ x: targetX, y: targetY }];
    let hitWall = false;
    let hitPlayer: Player | null = null;
    
    // Create response at the start
    const response = new GameResponse(player, `${player.name} shot ${directionName}`);
    response.setMove('shoot', directionName);

    while (true) {
      // Check if target position is within bounds
      if (targetX < 0 || targetX >= this.map.size || 
          targetY < 0 || targetY >= this.map.size) {
        response.message += " and shot into the void.";
        break;
      }

      const space = this.map.grid[targetY][targetX];
      const edge = space.edges[direction];

      if (!edge || edge.hasWall) {
        if (targetX === player.x && targetY === player.y) {
          response.message += " and hit the wall right next to them!";
        } else {
          response.message += " and hit a wall.";
        }
        hitWall = true;
        break;
      }

      // Move bullet to next position
      switch (direction) {
        case 0: targetY -= 1; break;
        case 1: targetX += 1; break;
        case 2: targetY += 1; break;
        case 3: targetX -= 1; break;
      }

      bulletPath.push({ x: targetX, y: targetY });

      // Check for hits before checking bounds
      for (const otherPlayer of this.players) {
        if (otherPlayer !== player && otherPlayer.x === targetX && otherPlayer.y === targetY) {
          hitPlayer = otherPlayer;
          break;
        }
      }

      if (hitPlayer) {
        response.message += ` and hit ${hitPlayer.name}!`;
        response.addDeath(player, hitPlayer, hitPlayer.hasTreasure);
        break;
      }
    }

    // Add bullet animation
    this.animator.addBulletPath(player, bulletPath);

    if (!hitWall && !hitPlayer) {
      response.message += " but missed.";
    }

    // Check for close encounters after shooting
    this.checkCloseEncounters(response);

    this.gameResponses.push(response);
    this.nextTurn();
    return response;
  }

  handleEncounters(player: Player, response: GameResponse) {
    for (const otherPlayer of this.players) {
      if (otherPlayer !== player && otherPlayer.x === player.x && otherPlayer.y === player.y) {
        const hadTreasure = otherPlayer.hasTreasure;
        
        if (hadTreasure) {
          player.hasTreasure = true;
          otherPlayer.hasTreasure = false;
          this.map.treasure = null;
          response.message += ` ${player.name} killed ${otherPlayer.name} and stole their treasure!`;
        } else {
          response.message += ` ${player.name} killed ${otherPlayer.name}!`;
        }
        
        response.addDeath(player, otherPlayer, hadTreasure);
        this.respawnPlayer(otherPlayer, false);
      }
    }
  }

  respawnPlayer(player: Player, keepTreasure: boolean = false) {
    // Get all occupied positions except the respawning player
    const occupiedPositions = this.players
      .filter(p => p !== player)
      .map(p => ({ x: p.x, y: p.y }));
    
    if (this.map.treasure) {
      occupiedPositions.push({ x: this.map.treasure.x, y: this.map.treasure.y });
    }

    const oldX = player.x;
    const oldY = player.y;
    const safePos = this.map.findSafeSpawnPosition(occupiedPositions);
    player.x = safePos.x;
    player.y = safePos.y;

    // Only keep treasure if explicitly specified (default is false)
    if (!keepTreasure) {
      player.hasTreasure = false;
    }

    // Add animation for the respawn
    this.animator.addMovement(player, oldX, oldY, safePos.x, safePos.y);

    const response = new GameResponse(
      player,
      `${player.name} respawned at a random location.`
    );
    this.gameResponses.push(response);
  }

  saveState() {
    const clonedMap = this.map.clone();
    const clonedPlayers = this.players.map((player) => player.clone());
    this.previousStates.push({ map: clonedMap, players: clonedPlayers, turn: this.turn });
  }

  undo() {
    const prevState = this.previousStates.pop();
    if (prevState) {
      this.map = prevState.map;
      this.players = prevState.players;
      this.turn = prevState.turn;
      this.currentPlayerIndex =
        (this.currentPlayerIndex - 1 + this.players.length) % this.players.length;
    }
  }

  checkVictory(): Player | null {
    for (const player of this.players) {
      if (player.hasTreasure && player.isOutside(this.map.size)) {
        return player;
      }
    }
    return null;
  }

  private getExitDirection(): number {
    const { x, y } = this.map.exitPosition;
    if (y === -1) return 0;
    if (x === this.map.size) return 1;
    if (y === this.map.size) return 2;
    return 3;
  }

  private getPositionFromExit(): [number, number] {
    const { x, y } = this.map.exitPosition;
    if (y === -1) return [x, 0];
    if (x === this.map.size) return [this.map.size - 1, y];
    if (y === this.map.size) return [x, this.map.size - 1];
    return [0, y];
  }

  getAnimator(): Animator {
    return this.animator;
  }

  private handleNPCEncounters(response: GameResponse) {
    const bear = this.players[PLAYER_CONSTANTS.BEAR_INDEX];
    const ghost = this.players[PLAYER_CONSTANTS.GHOST_INDEX];

    // Check bear encounters
    for (let i = 0; i < this.players.length; i++) {
      if (!PLAYER_CONSTANTS.isNPC(i)) {
        const player = this.players[i];
        if (player.x === bear.x && player.y === bear.y) {
          const hadTreasure = player.hasTreasure;
          if (hadTreasure) {
            // Drop the treasure at the kill location
            this.map.treasure = {
              x: player.x,
              y: player.y,
              clone: function() { return this; }
            };
            player.hasTreasure = false;
          }
          response.message += ` The Bear caught and killed ${player.name}!`;
          response.addDeath(bear, player, hadTreasure);
          this.respawnPlayer(player, false);
        }
        if (player.x === ghost.x && player.y === ghost.y) {
          const hadTreasure = player.hasTreasure;
          if (hadTreasure) {
            // Drop the treasure at the kill location
            this.map.treasure = {
              x: player.x,
              y: player.y,
              clone: function() { return this; }
            };
            player.hasTreasure = false;
          }
          response.message += ` The Ghost caught and killed ${player.name}!`;
          response.addDeath(ghost, player, hadTreasure);
          this.respawnPlayer(player, false);
        }
      }
    }
  }

  private findNearestPlayer(bear: Player): Player | null {
    let nearest: Player | null = null;
    let minDistance = Infinity;
    
    for (let i = 0; i < this.players.length; i++) {
      if (i !== PLAYER_CONSTANTS.BEAR_INDEX) {
        const player = this.players[i];
        const distance = Math.abs(player.x - bear.x) + Math.abs(player.y - bear.y);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = player;
        }
      }
    }
    
    return nearest;
  }

  private canMove(player: Player, direction: number): boolean {
    // Add null checks and bounds checking
    if (player.x < 0 || player.x >= this.map.size || 
        player.y < 0 || player.y >= this.map.size) {
      return false;
    }

    const space = this.map.grid[player.y][player.x];
    const edge = space.edges[direction];

    // Return false if edge doesn't exist or has a wall
    return edge ? !edge.hasWall : false;
  }

  private checkCloseEncounters(response: GameResponse) {
    const bear = this.players[PLAYER_CONSTANTS.BEAR_INDEX];
    const ghost = this.players[PLAYER_CONSTANTS.GHOST_INDEX];

    for (let i = 0; i < this.players.length; i++) {
      const player1 = this.players[i];
      
      // Skip NPC-NPC proximity checks
      if (PLAYER_CONSTANTS.isNPC(i)) continue;

      // Check player-player proximity (excluding NPCs)
      for (let j = i + 1; j < this.players.length; j++) {
        if (PLAYER_CONSTANTS.isNPC(j)) continue;
        const player2 = this.players[j];
        const distance = Math.abs(player1.x - player2.x) + Math.abs(player1.y - player2.y);
        if (distance <= 2) {
          response.addCloseEncounter(
            `${player1.name} is ${distance === 0 ? 'in the same space as' : 'close to'} ${player2.name}`,
            distance
          );
        }
      }

      // Check player-bear proximity
      const bearDistance = Math.abs(player1.x - bear.x) + Math.abs(player1.y - bear.y);
      if (bearDistance <= 2) {
        response.addCloseEncounter(
          `${player1.name} is ${bearDistance === 0 ? 'DEAD - in the same space as the Bear!' : 'close to the Bear'}`,
          bearDistance
        );
      }

      // Check player-ghost proximity
      const ghostDistance = Math.abs(player1.x - ghost.x) + Math.abs(player1.y - ghost.y);
      if (ghostDistance <= 2) {
        response.addCloseEncounter(
          `${player1.name} is ${ghostDistance === 0 ? 'DEAD - in the same space as the Ghost!' : 'close to the Ghost'}`,
          ghostDistance
        );
      }

      // Check player-treasure proximity
      if (this.map.treasure) {
        const treasureDistance = Math.abs(player1.x - this.map.treasure.x) + 
                               Math.abs(player1.y - this.map.treasure.y);
        if (treasureDistance <= 2) {
          response.addCloseEncounter(
            `${player1.name} is ${treasureDistance === 0 ? 'on top of' : 'close to'} the treasure`,
            treasureDistance
          );
        }
      }
    }
  }
}
