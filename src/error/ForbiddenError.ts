export function forbidden(name: string): never {
    const error = new Error(name + " forbidden");
    (error as any).status = 403;
    throw error;
  }
  