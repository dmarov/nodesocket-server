import { ErrorCodes } from "./codes";

export class IdentifiableError extends Error {
  readonly id: number;

  constructor(id: ErrorCodes, message?: string) {
    super(message);
    this.id = id;
    this.name = "generic error with code";
  }
}
