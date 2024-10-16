import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { ConsoleDTO, CreateConsoleDTO } from "../dto/console.dto";
import { notFound } from "../error/NotFoundError";
import { badRequest } from "../error/BadRequestError";
import { GameService, gameService } from "../services/game.service";
import { ReviewService, reviewService } from "../services/review.service";
import { GameDTO } from "../dto/game.dto";

@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {
  // Récupère toutes les consoles
  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }

  // Récupère une console par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO | null> {
    return consoleService.getConsoleById(id);
  }

  // Crée une nouvelle console
  @Post("/")
  public async createConsole(
    @Body() requestBody: CreateConsoleDTO
  ): Promise<ConsoleDTO> {
    const { name, manufacturer } = requestBody;
    return name && manufacturer ?  consoleService.createConsole(name, manufacturer) : badRequest("name and manufacturer must be provided");
  }

  // Supprime une console par ID
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    const games = await gameService.getGamesByConsoleId(id);
    for (const game of games) {
        const reviews = await reviewService.getReviewByGameId(game.id ?? -1);
        if (reviews.length > 0) {
          throw new Error("Cannot delete console with existing reviews for its games.");
        }
      await consoleService.deleteConsole(id);
    }
  }

  // Met à jour une console par ID
  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: CreateConsoleDTO
  ): Promise<ConsoleDTO | null> {
    const { name, manufacturer } = requestBody;
    return consoleService.updateConsole(id, name, manufacturer);
  }

@Get("{id}/games")
public async getGamesByConsoleId(@Path() id: number): Promise<GameDTO[]> {
  return gameService.getGamesByConsoleId(id);

}

}