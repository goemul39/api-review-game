import { Controller, Get, Route, Path, Tags, Post, Body, Patch } from "tsoa";
import { gameService } from "../services/game.service";
import { GameDTO } from "../dto/game.dto";

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
  
  
}
