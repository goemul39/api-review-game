import { number } from "joi";
import { CreateGameDTO, GameDTO, mapToGameDTO } from "../dto/game.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { ConsoleDTO } from "../dto/console.dto";
import { ReviewService, reviewService } from "./review.service";
import { forbidden } from "../error/ForbiddenError";

export class GameService {
  // Récupère tous les jeux
  public async getAllGames(): Promise<GameDTO[]> {
    const games = Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });

    return (await games).map(mapToGameDTO);
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
    console_id ?: number,
  
    
  ): Promise<Game> {
    
      const consoleFind = await Console.findByPk(console_id);
      return consoleFind ? Game.create({title : title, console_id : consoleFind.id}) : notFound("Console id :"+ console_id + "");
    
  }

  
  
  // Met à jour un jeu par ID
  public async updateGameById(id: number, updatedGame: CreateGameDTO): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (!game) {
      throw notFound(`Game with id ${id} not found`);
    }
    await game.update({title : updatedGame.title , console_id : updatedGame.console_id});
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

  public async deleteGame(id: number): Promise<void> {
    const reviews = await reviewService.getReviewByGameId(id);
    if (reviews.length > 0) {
        throw forbidden("Cannot delete game with existing reviews.");
    }
    await Game.destroy({ where: { id } });
}




  
}

export const gameService = new GameService();
