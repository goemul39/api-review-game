import { number } from "joi";
import { GameDTO } from "../dto/game.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { ConsoleDTO } from "../dto/console.dto";

export class GameService {
  // Récupère tous les jeux
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  // Récupère un jeu par ID
  public async getGameById(id: number): Promise<GameDTO> {
    const game = await Game.findByPk(id);
    if(!game){
      throw notFound(`Game with id ${id} not found`);
    }
    return game
  }

  public async createGame(
    title : string,
    console ?: ConsoleDTO,
  
    
  ): Promise<Game> {
    
      const consoleFind = await Console.findByPk(console?.id);
      return consoleFind ? Game.create({title : title, console_id : consoleFind.id}) : notFound("Console id :"+ console?.id + "");
    
  }

  
  
  // Met à jour un jeu par ID
  public async updateGameById(id: number, updatedGame: GameDTO): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (!game) {
      throw notFound(`Game with id ${id} not found`);
    }
    await game.update({title : updatedGame.title , console_id : updatedGame.console?.id});
    return game;
  }

  public async getGamesByConsoleId(id: number): Promise<GameDTO[]> {
    const console = await Console.findByPk(id);
    if (!console) {
      throw notFound(`Console with id ${id} not found`);
    }
    return Game.findAll({
      where: {
        console_id: id,
      },
    });
  }


  
}

export const gameService = new GameService();
