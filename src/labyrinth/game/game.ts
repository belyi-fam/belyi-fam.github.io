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
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    if (this.currentPlayerIndex === 0) {
      this.turn += 1;
    }
  }

  movePlayer(direction: number): GameResponse {
    this.saveState();
    const player = this.getCurrentPlayer();
    const directionName = this.directionNames[direction];
    const bear = this.players[PLAYER_CONSTANTS.BEAR_INDEX];

    // Store starting positions for animation
    const startX = player.x;
    const startY = player.y;
    const bearStartX = bear.x;
    const bearStartY = bear.y;

    if (player.isOutside(this.map.size)) {
      const exitDir = this.getExitDirection();
      if (direction === (exitDir + 2) % 4) {
        const [newX, newY] = this.getPositionFromExit();
        player.x = newX;
        player.y = newY;
        const response = new GameResponse(player, `${player.name} moved back into the labyrinth.`);
        response.setMove('move', directionName);
        this.gameResponses.push(response);
        this.nextTurn();
        return response;
      } else {
        const response = new GameResponse(player, `${player.name} can only move back through the exit.`);
        response.setMove('move', directionName);
        this.gameResponses.push(response);
        this.nextTurn();
        return response;
      }
    }

    const { x, y } = player;
    const space = this.map.grid[y][x];
    const edge = space.edges[direction];

    if (!edge || edge.hasWall) {
      const response = new GameResponse(player, `${player.name} tried to move ${directionName} but hit a wall.`);
      response.setMove('move', directionName);
      this.gameResponses.push(response);
      this.nextTurn();
      return response;
    }

    // Move the player
    let newX = x;
    let newY = y;

    switch (direction) {
      case 0: newY -= 1; break; // Up
      case 1: newX += 1; break; // Right
      case 2: newY += 1; break; // Down
      case 3: newX -= 1; break; // Left
    }

    // Update player position
    if (edge.isExit) {
      player.x = newX;
      player.y = newY;
    } else if (newX >= 0 && newX < this.map.size && newY >= 0 && newY < this.map.size) {
      player.x = newX;
      player.y = newY;
    } else {
      player.x = -1;
      player.y = -1;
    }

    // Move the bear in the same direction if possible
    if (player !== bear) { // Don't move the bear when it's the bear's turn
      const bearSpace = this.map.grid[bear.y][bear.x];
      const bearEdge = bearSpace.edges[direction];
      
      if (bearEdge && !bearEdge.hasWall) {
        let bearNewX = bear.x;
        let bearNewY = bear.y;
        
        switch (direction) {
          case 0: bearNewY -= 1; break; // Up
          case 1: bearNewX += 1; break; // Right
          case 2: bearNewY += 1; break; // Down
          case 3: bearNewX -= 1; break; // Left
        }

        // Update bear position if it's within bounds
        if (bearNewX >= 0 && bearNewX < this.map.size && 
            bearNewY >= 0 && bearNewY < this.map.size) {
          bear.x = bearNewX;
          bear.y = bearNewY;
          
          // Add bear movement animation
          this.animator.addMovement(bear, bearStartX, bearStartY, bearNewX, bearNewY);
        }
      }
    }

    // Add player movement animation
    this.animator.addMovement(player, startX, startY, player.x, player.y);

    // Update response message
    const response = new GameResponse(player, `${player.name} successfully moved ${directionName}`);
    response.setMove('move', directionName);

    // Handle treasure pickup
    if (this.map.treasure && player.x === this.map.treasure.x && player.y === this.map.treasure.y) {
      player.hasTreasure = true;
      this.map.treasure = null;
      response.message += ` ${player.name} picked up the treasure!`;
    }

    // Check for close encounters
    this.checkCloseEncounters(response);

    // Handle encounters for both player and bear
    this.handleEncounters(player, response);
    if (player !== bear) {
      this.handleBearEncounters(response);
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
        this.respawnPlayer(otherPlayer);
      }
    }
  }

  respawnPlayer(player: Player) {
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

  private handleBearEncounters(response: GameResponse) {
    const bear = this.players[PLAYER_CONSTANTS.BEAR_INDEX];
    for (let i = 0; i < this.players.length; i++) {
      if (i !== PLAYER_CONSTANTS.BEAR_INDEX) {
        const player = this.players[i];
        if (player.x === bear.x && player.y === bear.y) {
          const hadTreasure = player.hasTreasure;
          response.message += ` The Bear caught and killed ${player.name}!`;
          response.addDeath(bear, player, hadTreasure);
          this.respawnPlayer(player);
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
    for (let i = 0; i < this.players.length; i++) {
      const player1 = this.players[i];
      
      // Check player-player proximity
      for (let j = i + 1; j < this.players.length; j++) {
        const player2 = this.players[j];
        const distance = Math.abs(player1.x - player2.x) + Math.abs(player1.y - player2.y);
        if (distance <= 2 && distance > 0) {
          response.addCloseEncounter(
            `${player1.name} is close to ${player2.name}`,
            distance
          );
        }
      }

      // Check player-treasure proximity
      if (this.map.treasure) {
        const treasureDistance = Math.abs(player1.x - this.map.treasure.x) + 
                               Math.abs(player1.y - this.map.treasure.y);
        if (treasureDistance <= 2) {
          response.addCloseEncounter(
            `${player1.name} is close to the treasure`,
            treasureDistance
          );
        }
      }
    }
  }
}
