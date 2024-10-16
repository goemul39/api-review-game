import { Controller, Get, Route, Path, Tags, Post, Body, Patch, Delete } from "tsoa";
import { GameService, gameService } from "../services/game.service";
import { GameDTO } from "../dto/game.dto";
import { ReviewDTO } from "../dto/review.dto";
import { notFound } from "../error/NotFoundError";
import { ReviewService, reviewService } from "../services/review.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  
  // Récupère tous les jeux
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  // Récupère un jeu par ID
  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }

  // Crée un nouveau jeu
  @Post("/")
  public async createGame(@Body() requestBody: GameDTO): Promise<GameDTO> {
    const {title, console} = requestBody;
    return gameService.createGame(title, console)

  }

  // Met à jour un jeu par ID
  @Patch("{id}")
  public async updateGameById(@Path() id: number, @Body() requestBody: GameDTO): Promise<GameDTO | null> {
    return gameService.updateGameById(id, requestBody);
  }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }

  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number): Promise<ReviewDTO[]> {
    return reviewService.getReviewByGameId(id);
  }
  
}
