import { Map } from './map';
import { Player } from './player';
import { Treasure } from './treasure';

export function drawMap(
  map: Map,
  ctx: CanvasRenderingContext2D,
  players: Player[],
  animate: boolean = false
) {
  const { size, grid } = map;

  // Clear the entire canvas first with white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Adjust cellSize to fill the canvas - make it smaller
  const canvasWidth = ctx.canvas.width * 0.7;
  const canvasHeight = ctx.canvas.height * 0.6;
  const cellSize = Math.min(canvasWidth, canvasHeight) / size;

  // Center the map
  const offsetX = (ctx.canvas.width - size * cellSize) / 2;
  const offsetY = (ctx.canvas.height - size * cellSize) / 2;

  const wallColors = {
    normal: 'black',
    outside: '#C04000', // Mahogany color
    exit: 'green',
  };

  ctx.lineWidth = 2;

  // Draw spaces first
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const space = grid[i][j];

      ctx.fillStyle = 'white';
      ctx.fillRect(
        offsetX + j * cellSize,
        offsetY + i * cellSize,
        cellSize,
        cellSize
      );

      // Draw stationary treasure if it exists in this space
      if (map.treasure && map.treasure.x === j && map.treasure.y === i) {
        drawTreasure(ctx, 
          offsetX + j * cellSize + cellSize / 2,
          offsetY + i * cellSize + cellSize / 2,
          cellSize / 3
        );
      }
    }
  }

  // Draw exits first with a special appearance
  console.log("Drawing exit at position:", map.exitPosition);
  const exitX = map.exitPosition.x;
  const exitY = map.exitPosition.y;
  
  // Determine which edge of which cell contains the exit
  let exitCellX = exitX;
  let exitCellY = exitY;
  let exitDirection = 0;
  
  if (exitX === -1) {
    exitCellX = 0;
    exitDirection = 3; // Left
  } else if (exitX === map.size) {
    exitCellX = map.size - 1;
    exitDirection = 1; // Right
  } else if (exitY === -1) {
    exitCellY = 0;
    exitDirection = 0; // Top
  } else if (exitY === map.size) {
    exitCellY = map.size - 1;
    exitDirection = 2; // Bottom
  }

  console.log("Exit cell coordinates:", { x: exitCellX, y: exitCellY, direction: exitDirection });

  // Draw the exit with a distinctive appearance
  ctx.beginPath();
  ctx.setLineDash([5, 5]); // Create dashed line
  ctx.strokeStyle = '#FFD700'; // Golden yellow
  ctx.lineWidth = 4;

  // Calculate arrow position outside the maze
  const arrowLength = cellSize * 0.8;
  let arrowStartX = 0, arrowStartY = 0, arrowEndX = 0, arrowEndY = 0;
  
  switch (exitDirection) {
    case 0: // Top
      arrowStartX = offsetX + (exitCellX + 0.5) * cellSize;
      arrowStartY = offsetY + exitCellY * cellSize;
      arrowEndX = arrowStartX;
      arrowEndY = arrowStartY - arrowLength;
      break;
    case 1: // Right
      arrowStartX = offsetX + (exitCellX + 1) * cellSize;
      arrowStartY = offsetY + (exitCellY + 0.5) * cellSize;
      arrowEndX = arrowStartX + arrowLength;
      arrowEndY = arrowStartY;
      break;
    case 2: // Bottom
      arrowStartX = offsetX + (exitCellX + 0.5) * cellSize;
      arrowStartY = offsetY + (exitCellY + 1) * cellSize;
      arrowEndX = arrowStartX;
      arrowEndY = arrowStartY + arrowLength;
      break;
    case 3: // Left
      arrowStartX = offsetX + exitCellX * cellSize;
      arrowStartY = offsetY + (exitCellY + 0.5) * cellSize;
      arrowEndX = arrowStartX - arrowLength;
      arrowEndY = arrowStartY;
      break;
  }

  // Draw dashed line
  ctx.beginPath();
  ctx.moveTo(arrowStartX, arrowStartY);
  ctx.lineTo(arrowEndX, arrowEndY);
  ctx.stroke();

  // Draw arrowhead
  const arrowheadSize = cellSize * 0.2;
  const angle = Math.atan2(arrowEndY - arrowStartY, arrowEndX - arrowStartX);
  
  ctx.setLineDash([]); // Reset to solid line for arrowhead
  ctx.beginPath();
  ctx.moveTo(arrowEndX, arrowEndY);
  ctx.lineTo(
    arrowEndX - arrowheadSize * Math.cos(angle - Math.PI / 6),
    arrowEndY - arrowheadSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(arrowEndX, arrowEndY);
  ctx.lineTo(
    arrowEndX - arrowheadSize * Math.cos(angle + Math.PI / 6),
    arrowEndY - arrowheadSize * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();

  // Reset line properties
  ctx.setLineDash([]);
  ctx.lineWidth = 2;

  // Draw all walls
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const space = grid[i][j];

      // Draw all four walls for each cell if they exist
      for (let dir = 0; dir < 4; dir++) {
        const edge = space.edges[dir];
        if (edge?.hasWall) {
          ctx.beginPath();
          switch (dir) {
            case 0: // Top wall
              ctx.moveTo(offsetX + j * cellSize, offsetY + i * cellSize);
              ctx.lineTo(offsetX + (j + 1) * cellSize, offsetY + i * cellSize);
              break;
            case 1: // Right wall
              ctx.moveTo(offsetX + (j + 1) * cellSize, offsetY + i * cellSize);
              ctx.lineTo(offsetX + (j + 1) * cellSize, offsetY + (i + 1) * cellSize);
              break;
            case 2: // Bottom wall
              ctx.moveTo(offsetX + j * cellSize, offsetY + (i + 1) * cellSize);
              ctx.lineTo(offsetX + (j + 1) * cellSize, offsetY + (i + 1) * cellSize);
              break;
            case 3: // Left wall
              ctx.moveTo(offsetX + j * cellSize, offsetY + i * cellSize);
              ctx.lineTo(offsetX + j * cellSize, offsetY + (i + 1) * cellSize);
              break;
          }

          if (edge.isExit) {
            ctx.strokeStyle = wallColors.exit;
          } else if (edge.isOutsideWall) {
            ctx.strokeStyle = wallColors.outside;
          } else {
            ctx.strokeStyle = wallColors.normal;
          }
          ctx.stroke();
        }
      }
    }
  }

  // Draw Players (including those outside the map)
  for (let player of players) {
    const playerX = player.x;
    const playerY = player.y;
    
    // Calculate drawing position, including outside the grid
    let drawX = offsetX + playerX * cellSize + cellSize / 2;
    let drawY = offsetY + playerY * cellSize + cellSize / 2;
    
    // Adjust position for players outside the grid
    if (playerX < 0) drawX = offsetX - cellSize/2;
    if (playerX >= size) drawX = offsetX + size * cellSize + cellSize/2;
    if (playerY < 0) drawY = offsetY - cellSize/2;
    if (playerY >= size) drawY = offsetY + size * cellSize + cellSize/2;

    // Draw player circle
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
      drawX,
      drawY,
      cellSize / 3,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw treasure on top if player has it
    if (player.hasTreasure) {
      drawTreasure(ctx, drawX, drawY, cellSize / 4); // Slightly smaller treasure
    }
  }

  // Draw items
  for (const item of map.items) {
    const itemX = item.x;
    const itemY = item.y;
    const drawX = offsetX + itemX * cellSize + cellSize / 2;
    const drawY = offsetY + itemY * cellSize + cellSize / 2;

    if (item.type === 'bullet') {
      // Draw bullet icon
      ctx.fillStyle = 'silver';
      ctx.beginPath();
      ctx.arc(
        drawX,
        drawY,
        cellSize / 6,
        0,
        2 * Math.PI
      );
      ctx.fill();
      // Draw the amount of bullets
      ctx.fillStyle = 'black';
      ctx.font = `${cellSize / 4}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        item.amount.toString(),
        drawX,
        drawY
      );
    }
  }

  // Animate movements and bullet shooting
  if (animate) {
    // Implement animation logic here
    // This could involve interpolating positions over time using requestAnimationFrame
  }
}

// Helper function to draw treasure star
export function drawTreasure(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  ctx.beginPath();
  for (let k = 0; k < 5; k++) {
    const outerX = centerX + radius * Math.cos(k * 4 * Math.PI / 5 - Math.PI / 2);
    const outerY = centerY + radius * Math.sin(k * 4 * Math.PI / 5 - Math.PI / 2);
    const innerX = centerX + radius/2 * Math.cos(k * 4 * Math.PI / 5 + 2*Math.PI/5 - Math.PI / 2);
    const innerY = centerY + radius/2 * Math.sin(k * 4 * Math.PI / 5 + 2*Math.PI/5 - Math.PI / 2);
    
    if (k === 0) {
      ctx.moveTo(outerX, outerY);
    } else {
      ctx.lineTo(outerX, outerY);
    }
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fillStyle = 'gold';
  ctx.fill();
  ctx.strokeStyle = 'darkgoldenrod';
  ctx.stroke();
}
