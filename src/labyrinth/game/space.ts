import { Edge } from './edge';

export class Space {
  x: number;
  y: number;
  edges: (Edge | null)[]; // [up, right, down, left]
  isOutside: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.edges = [null, null, null, null];
    this.isOutside = false; // Players can "fall" outside the board here
  }

  clone(): Space {
    const newSpace = new Space(this.x, this.y);
    newSpace.edges = this.edges.map(edge => (edge ? edge.clone() : null));
    newSpace.isOutside = this.isOutside;
    return newSpace;
  }
}
