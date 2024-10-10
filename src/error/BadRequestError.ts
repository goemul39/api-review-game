export function badRequest(name: string): never {
    const error = new Error(name);
    (error as any).status = 400;
    throw error;
  }
  