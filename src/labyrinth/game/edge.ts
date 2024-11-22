export class Edge {
  hasWall: boolean;
  isOutsideWall: boolean;
  isExit: boolean;

  constructor(hasWall: boolean = true, isOutsideWall: boolean = false, isExit: boolean = false) {
    this.hasWall = hasWall;
    this.isOutsideWall = isOutsideWall;
    this.isExit = isExit;
  }

  clone(): Edge {
    return new Edge(this.hasWall, this.isOutsideWall, this.isExit);
  }
}
