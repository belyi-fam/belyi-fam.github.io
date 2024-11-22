export class Treasure {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Treasure {
    return new Treasure(this.x, this.y);
  }
} 