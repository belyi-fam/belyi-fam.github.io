import { Map } from './map';
import { Player } from './player';
import { drawMap, drawTreasure } from './draw';

interface AnimationState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  player: Player;
}

interface BulletAnimationState {
  startX: number;
  startY: number;
  path: { x: number; y: number }[];
  progress: number;
  color: string;
}

export class Animator {
  private animations: AnimationState[] = [];
  private bulletAnimations: BulletAnimationState[] = [];
  private readonly ANIMATION_DURATION = 500; // milliseconds
  private readonly BULLET_DURATION = 300; // milliseconds
  
  addMovement(player: Player, fromX: number, fromY: number, toX: number, toY: number) {
    this.animations.push({
      startX: fromX,
      startY: fromY,
      endX: toX,
      endY: toY,
      progress: 0,
      player
    });
  }

  addBulletPath(player: Player, path: { x: number; y: number }[]) {
    if (path.length < 2) return;
    
    this.bulletAnimations.push({
      startX: path[0].x,
      startY: path[0].y,
      path,
      progress: 0,
      color: player.color
    });
  }

  animate(timestamp: number, ctx: CanvasRenderingContext2D, map: Map, players: Player[]) {
    // First draw the base map without moving players
    const staticPlayers = players.filter(p => 
      !this.animations.some(anim => anim.player === p)
    );
    
    drawMap(map, ctx, staticPlayers, false);

    // Draw bullet trails
    this.bulletAnimations.forEach(bullet => {
      const totalSegments = bullet.path.length - 1;
      const progressPerSegment = 1 / totalSegments;
      const currentSegment = Math.min(
        Math.floor(bullet.progress / progressPerSegment),
        totalSegments - 1
      );
      const segmentProgress = (bullet.progress - currentSegment * progressPerSegment) / progressPerSegment;

      const startPoint = bullet.path[currentSegment];
      const endPoint = bullet.path[currentSegment + 1];

      const canvasWidth = ctx.canvas.width * 0.7;
      const canvasHeight = ctx.canvas.height * 0.6;
      const cellSize = Math.min(canvasWidth, canvasHeight) / map.size;
      const offsetX = (ctx.canvas.width - map.size * cellSize) / 2;
      const offsetY = (ctx.canvas.height - map.size * cellSize) / 2;

      const x = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
      const y = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;

      // Draw bullet
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(
        offsetX + x * cellSize + cellSize / 2,
        offsetY + y * cellSize + cellSize / 2,
        cellSize / 8,
        0,
        2 * Math.PI
      );
      ctx.fill();

      // Draw trail
      ctx.strokeStyle = bullet.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(
        offsetX + startPoint.x * cellSize + cellSize / 2,
        offsetY + startPoint.y * cellSize + cellSize / 2
      );
      ctx.lineTo(
        offsetX + x * cellSize + cellSize / 2,
        offsetY + y * cellSize + cellSize / 2
      );
      ctx.stroke();
      ctx.globalAlpha = 1;

      bullet.progress += 1 / (this.BULLET_DURATION / 16);
    });

    // Then draw animated players
    this.animations.forEach(anim => {
      const x = anim.startX + (anim.endX - anim.startX) * anim.progress;
      const y = anim.startY + (anim.endY - anim.startY) * anim.progress;
      
      // Draw player at interpolated position
      const canvasWidth = ctx.canvas.width * 0.7;  // Match the new sizes from draw.ts
      const canvasHeight = ctx.canvas.height * 0.6;
      const cellSize = Math.min(canvasWidth, canvasHeight) / map.size;
      const offsetX = (ctx.canvas.width - map.size * cellSize) / 2;
      const offsetY = (ctx.canvas.height - map.size * cellSize) / 2;

      // Calculate drawing position, including outside the grid
      let drawX = offsetX + x * cellSize + cellSize / 2;
      let drawY = offsetY + y * cellSize + cellSize / 2;
      
      // Adjust position for players outside the grid
      if (x < 0) drawX = offsetX - cellSize/2;
      if (x >= map.size) drawX = offsetX + map.size * cellSize + cellSize/2;
      if (y < 0) drawY = offsetY - cellSize/2;
      if (y >= map.size) drawY = offsetY + map.size * cellSize + cellSize/2;

      ctx.fillStyle = anim.player.color;
      ctx.beginPath();
      ctx.arc(
        drawX,
        drawY,
        cellSize / 3,
        0,
        2 * Math.PI
      );
      ctx.fill();

      if (anim.player.hasTreasure) {
        drawTreasure(
          ctx,
          drawX,
          drawY,
          cellSize / 4
        );
      }

      // Update progress
      anim.progress += 1 / (this.ANIMATION_DURATION / 16); // 16ms is roughly one frame
    });

    // Remove finished animations
    this.animations = this.animations.filter(anim => anim.progress < 1);
    this.bulletAnimations = this.bulletAnimations.filter(bullet => bullet.progress < 1);

    // Return true if there are still animations running
    return this.animations.length > 0 || this.bulletAnimations.length > 0;
  }
} 