export class Entity {
  // Base class for entities on the map
}

export class Player extends Entity {
  name: string;
  color: string;
  x: number;
  y: number;
  bullets: number;
  hasTreasure: boolean;

  constructor(name: string, x: number, y: number, color: string) {
    super();
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.bullets = 3; // Starting bullets
    this.hasTreasure = false; // Initialize hasTreasure
  }

  clone(): Player {
    return new Player(this.name, this.x, this.y, this.color);
  }

  isOutside(mapSize: number): boolean {
    return this.x < 0 || this.x >= mapSize || this.y < 0 || this.y >= mapSize;
  }
}
