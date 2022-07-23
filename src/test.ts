declare const req: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

const context = req.context('./', true, /\.spec\.ts$/);
context.keys().map(context);

