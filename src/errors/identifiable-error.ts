export abstract class IdentifiableError extends Error {
  abstract getId(): number;

  constructor(message?: string) {
    super(message);
    this.name = "generic error with code";
  }
}
