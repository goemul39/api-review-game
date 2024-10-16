import { Game } from "../models/game.model";
import { ConsoleDTO } from "./console.dto";

export interface GameDTO {
  id?: number;
  title: string;
  console?: ConsoleDTO;
}


export interface CreateGameDTO {
  title: string;
  console_id: number;
}

export function mapToGameDTO(game: Game): GameDTO {
  return {
    id: game.id,
    title: game.title,
    console: game.console
  };
}