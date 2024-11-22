import { Player } from './player';

export interface Death {
  killer: string;
  victim: string;
  hadTreasure: boolean;
}

export interface CloseEncounter {
  description: string;
  distance: number;
}

export interface Move {
  player: string;
  action: string;
  direction: string;
}

export class GameResponse {
  move: Move;
  deaths: Death[];
  close: CloseEncounter[];
  message: string;
  player: Player;

  constructor(player: Player, message: string) {
    this.player = player;
    this.message = message;
    this.move = {
      player: player.name,
      action: "unknown",
      direction: "unknown"
    };
    this.deaths = [];
    this.close = [];
  }

  addDeath(killer: Player, victim: Player, hadTreasure: boolean) {
    this.deaths.push({
      killer: killer.name,
      victim: victim.name,
      hadTreasure
    });
  }

  addCloseEncounter(description: string, distance: number) {
    this.close.push({ description, distance });
  }

  setMove(action: string, direction: string) {
    this.move = {
      player: this.player.name,
      action,
      direction
    };
  }

  toJSON() {
    return {
      player: this.player.name,
      message: this.message,
      move: this.move,
      deaths: this.deaths,
      close: this.close
    };
  }
} 