export abstract class ErrorWithCode extends Error {
  abstract getCode(): number;

  constructor(message?: string) {
    super(message);
    this.name = "generic error with code";
  }
}
