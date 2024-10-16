export interface ConsoleDTO {
  id?: number;
  name?: string;
  manufacturer?: string;
}



export interface CreateConsoleDTO {
  name: string;
  manufacturer?: string;
}