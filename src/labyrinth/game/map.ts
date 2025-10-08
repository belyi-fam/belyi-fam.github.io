import { Space } from './space';
import { Edge } from './edge';
import { Treasure } from './treasure';
import { MAZE_CONSTANTS } from './constants';
import { Item } from './item';

interface OutsideEdge {
  edge: Edge;
  position: { x: number; y: number };
  direction: number;  // 0: top, 1: right, 2: bottom, 3: left
}

interface Position {
  x: number;
  y: number;
}

export class Map {
  grid: Space[][];
  size: number;
  exitPosition: { x: number; y: number } = { x: 0, y: 0 };
  treasure: Treasure | null;
  outsideEdges: OutsideEdge[] = [];
  items: Item[] = [];

  constructor(size: number) {
    this.size = size;
    this.grid = [];
    this.outsideEdges = [];

    // Create shared edge arrays
    const horizontalEdges: Edge[][] = Array(size + 1)
      .fill(null)
      .map(() => Array(size).fill(null));
    const verticalEdges: Edge[][] = Array(size)
      .fill(null)
      .map(() => Array(size + 1).fill(null));

    // Initialize all edges
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j < size; j++) {
        // Horizontal edges (top/bottom of cells)
        const isTopOutside = i === 0;
        const isBottomOutside = i === size;
        horizontalEdges[i][j] = new Edge(true, isTopOutside || isBottomOutside);
        
        // Store outside edges
        if (isTopOutside) {
          this.outsideEdges.push({
            edge: horizontalEdges[i][j],
            position: { x: j, y: 0 },
            direction: 0
          });
        }
        if (isBottomOutside) {
          this.outsideEdges.push({
            edge: horizontalEdges[i][j],
            position: { x: j, y: size - 1 },
            direction: 2
          });
        }
      }
    }

    // Initialize vertical edges
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size; j++) {
        const isLeftOutside = j === 0;
        const isRightOutside = j === size;
        verticalEdges[i][j] = new Edge(true, isLeftOutside || isRightOutside);
        
        // Store outside edges
        if (isLeftOutside) {
          this.outsideEdges.push({
            edge: verticalEdges[i][j],
            position: { x: 0, y: i },
            direction: 3
          });
        }
        if (isRightOutside) {
          this.outsideEdges.push({
            edge: verticalEdges[i][j],
            position: { x: size - 1, y: i },
            direction: 1
          });
        }
      }
    }

    // Create spaces and assign shared edges
    for (let i = 0; i < size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < size; j++) {
        const space = new Space(i, j);
        
        // Assign edges - these are shared between adjacent spaces
        space.edges[0] = horizontalEdges[i][j];      // Top edge
        space.edges[1] = verticalEdges[i][j + 1];    // Right edge
        space.edges[2] = horizontalEdges[i + 1][j];  // Bottom edge
        space.edges[3] = verticalEdges[i][j];        // Left edge

        this.grid[i][j] = space;
      }
    }

    // Generate maze using a modified version of Prim's algorithm
    this.generateMaze();

    // Place random exit from outside edges
    this.placeRandomExit();

    // Place treasure in a safe position
    const safePos = this.findSafeSpawnPosition([]);
    this.treasure = new Treasure(safePos.x, safePos.y);
  }

  private placeRandomExit() {
    console.log("Starting exit placement...");
    console.log("Outside edges:", this.outsideEdges);
    
    // Pick a random outside edge
    const exitEdgeInfo = this.outsideEdges[Math.floor(Math.random() * this.outsideEdges.length)];
    console.log("Selected exit edge:", exitEdgeInfo);
    
    // Set the exit properties
    exitEdgeInfo.edge.isExit = true;
    exitEdgeInfo.edge.hasWall = false;  // Remove the wall
    exitEdgeInfo.edge.isOutsideWall = true;  // Ensure it's marked as outside wall
    
    console.log("Exit edge properties:", {
      isExit: exitEdgeInfo.edge.isExit,
      hasWall: exitEdgeInfo.edge.hasWall,
      isOutsideWall: exitEdgeInfo.edge.isOutsideWall
    });
    
    // Set exit position based on direction
    switch (exitEdgeInfo.direction) {
      case 0: // Top
        this.exitPosition = { x: exitEdgeInfo.position.x, y: -1 };
        console.log("Placed exit on TOP at", this.exitPosition);
        break;
      case 1: // Right
        this.exitPosition = { x: this.size, y: exitEdgeInfo.position.y };
        console.log("Placed exit on RIGHT at", this.exitPosition);
        break;
      case 2: // Bottom
        this.exitPosition = { x: exitEdgeInfo.position.x, y: this.size };
        console.log("Placed exit on BOTTOM at", this.exitPosition);
        break;
      case 3: // Left
        this.exitPosition = { x: -1, y: exitEdgeInfo.position.y };
        console.log("Placed exit on LEFT at", this.exitPosition);
        break;
    }

    // Double check the edge in the grid matches the outside edge
    const space = this.grid[exitEdgeInfo.position.y][exitEdgeInfo.position.x];
    const gridEdge = space.edges[exitEdgeInfo.direction];
    if (gridEdge) {
      gridEdge.isExit = true;
      gridEdge.hasWall = false;
      gridEdge.isOutsideWall = true;
      console.log("Grid edge properties:", {
        isExit: gridEdge.isExit,
        hasWall: gridEdge.hasWall,
        isOutsideWall: gridEdge.isOutsideWall
      });
    }

    console.log("Final exit state:", {
      position: this.exitPosition,
      edge: exitEdgeInfo.edge,
      gridEdge: gridEdge
    });
  }

  generateMaze() {
    const visited = Array(this.size).fill(false).map(() => Array(this.size).fill(false));
    const stack: [number, number][] = [];
    
    // Start from a random cell
    const startY = Math.floor(Math.random() * this.size);
    const startX = Math.floor(Math.random() * this.size);
    visited[startY][startX] = true;
    stack.push([startY, startX]);

    // First pass: Create a basic connected maze
    while (stack.length > 0) {
      const [currentY, currentX] = stack[stack.length - 1];
      const neighbors: [number, number, number][] = []; // [y, x, direction]

      // Check all neighbors
      if (currentY > 0 && !visited[currentY - 1][currentX]) neighbors.push([currentY - 1, currentX, 0]);
      if (currentX < this.size - 1 && !visited[currentY][currentX + 1]) neighbors.push([currentY, currentX + 1, 1]);
      if (currentY < this.size - 1 && !visited[currentY + 1][currentX]) neighbors.push([currentY + 1, currentX, 2]);
      if (currentX > 0 && !visited[currentY][currentX - 1]) neighbors.push([currentY, currentX - 1, 3]);

      if (neighbors.length > 0) {
        // Choose a random neighbor
        const [nextY, nextX, direction] = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        // Remove wall between current cell and chosen neighbor
        this.grid[currentY][currentX].edges[direction]!.hasWall = false;
        this.grid[nextY][nextX].edges[(direction + 2) % 4]!.hasWall = false;
        
        visited[nextY][nextX] = true;
        stack.push([nextY, nextX]);
      } else {
        stack.pop();
      }
    }

    // Second pass: Remove walls randomly
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const space = this.grid[i][j];
        
        for (let dir = 0; dir < 4; dir++) {
          const edge = space.edges[dir];
          
          if (edge && !edge.isOutsideWall && edge.hasWall) {
            if (Math.random() < MAZE_CONSTANTS.WALL_REMOVAL_CHANCE) {
              edge.hasWall = false;
              
              // Update adjacent cell's corresponding edge
              let [nextY, nextX] = [i, j];
              switch (dir) {
                case 0: nextY--; break;
                case 1: nextX++; break;
                case 2: nextY++; break;
                case 3: nextX--; break;
              }
              
              if (nextY >= 0 && nextY < this.size && nextX >= 0 && nextX < this.size) {
                this.grid[nextY][nextX].edges[(dir + 2) % 4]!.hasWall = false;
              }
            }
          }
        }
      }
    }

    // Third pass: Ensure no completely enclosed spaces
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const space = this.grid[i][j];
        
        // Count walls around this space
        let wallCount = 0;
        for (let dir = 0; dir < 4; dir++) {
          if (space.edges[dir]?.hasWall) wallCount++;
        }
        
        // If space is enclosed (4 walls), remove a random non-outside wall
        if (wallCount === 4) {
          const possibleDirs = [];
          for (let dir = 0; dir < 4; dir++) {
            if (!space.edges[dir]?.isOutsideWall) {
              possibleDirs.push(dir);
            }
          }
          
          if (possibleDirs.length > 0) {
            const randomDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            space.edges[randomDir]!.hasWall = false;
            
            // Update adjacent cell's corresponding edge
            let [nextY, nextX] = [i, j];
            switch (randomDir) {
              case 0: nextY--; break;
              case 1: nextX++; break;
              case 2: nextY++; break;
              case 3: nextX--; break;
            }
            
            if (nextY >= 0 && nextY < this.size && nextX >= 0 && nextX < this.size) {
              this.grid[nextY][nextX].edges[(randomDir + 2) % 4]!.hasWall = false;
            }
          }
        }
      }
    }
  }

  clone(): Map {
    const newMap = new Map(this.size);
    
    // Create new shared edges with same properties
    const horizontalEdges: Edge[][] = Array(this.size + 1)
      .fill(null)
      .map(() => Array(this.size).fill(null));
    const verticalEdges: Edge[][] = Array(this.size)
      .fill(null)
      .map(() => Array(this.size + 1).fill(null));

    // Clone all edges first
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const space = this.grid[i][j];
        
        // Clone horizontal edges (if not already cloned)
        if (!horizontalEdges[i][j]) {
          horizontalEdges[i][j] = space.edges[0]!.clone();
        }
        if (!horizontalEdges[i + 1] && !horizontalEdges[i + 1]?.[j]) {
          horizontalEdges[i + 1] = horizontalEdges[i + 1] || [];
          horizontalEdges[i + 1][j] = space.edges[2]!.clone();
        }
        
        // Clone vertical edges (if not already cloned)
        if (!verticalEdges[i][j]) {
          verticalEdges[i][j] = space.edges[3]!.clone();
        }
        if (!verticalEdges[i][j + 1]) {
          verticalEdges[i][j + 1] = space.edges[1]!.clone();
        }
      }
    }

    // Assign cloned edges to new spaces
    for (let i = 0; i < this.size; i++) {
      newMap.grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        const space = new Space(i, j);
        space.edges[0] = horizontalEdges[i][j];      // Top edge
        space.edges[1] = verticalEdges[i][j + 1];    // Right edge
        space.edges[2] = horizontalEdges[i + 1][j];  // Bottom edge
        space.edges[3] = verticalEdges[i][j];        // Left edge
        newMap.grid[i][j] = space;
      }
    }

    // Make sure to copy the exit position
    newMap.exitPosition = { ...this.exitPosition };
    
    // Find the exit edge in the original map and mark it in the new map
    const { x, y } = this.exitPosition;
    let exitDirection: number;
    let exitSpace: Space;
    
    if (y === -1) {
      exitDirection = 0;
      exitSpace = newMap.grid[0][x];
    } else if (x === this.size) {
      exitDirection = 1;
      exitSpace = newMap.grid[y][this.size - 1];
    } else if (y === this.size) {
      exitDirection = 2;
      exitSpace = newMap.grid[this.size - 1][x];
    } else {
      exitDirection = 3;
      exitSpace = newMap.grid[y][0];
    }
    
    if (exitSpace.edges[exitDirection]) {
      exitSpace.edges[exitDirection]!.isExit = true;
      exitSpace.edges[exitDirection]!.hasWall = false;
    }

    newMap.treasure = this.treasure ? this.treasure.clone() : null;

    // Make sure to copy the outside edges references
    newMap.outsideEdges = this.outsideEdges.map(oe => ({
      edge: oe.edge.clone(),
      position: { ...oe.position },
      direction: oe.direction
    }));

    return newMap;
  }

  findSafeSpawnPosition(existingPositions: Position[]): Position {
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loop
    
    while (attempts < maxAttempts) {
      const x = Math.floor(Math.random() * this.size);
      const y = Math.floor(Math.random() * this.size);
      
      // Check if position is already occupied
      const isOccupied = existingPositions.some(pos => 
        pos.x === x && pos.y === y
      );
      
      if (!isOccupied) {
        return { x, y };
      }
      
      attempts++;
    }
    
    // If we couldn't find a safe position after max attempts,
    // expand search to less optimal positions
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const isOccupied = existingPositions.some(pos => 
          pos.x === j && pos.y === i
        );
        if (!isOccupied) {
          return { x: j, y: i };
        }
      }
    }
    
    // If somehow everything is occupied, return a default position
    console.warn('Could not find safe spawn position!');
    return { x: 0, y: 0 };
  }
}
