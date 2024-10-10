import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID //TODO
  public async getConsoleById(id: number): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if(!console){
      throw notFound(`Console with id ${id} not found`);
    }
    return console
  }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID 
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);
    if (console) {
      console.destroy();
    }
  }

  // Met à jour une console //TODO
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    throw notFound(`Console with id ${id} not found`);

  }
}

export const consoleService = new ConsoleService();
