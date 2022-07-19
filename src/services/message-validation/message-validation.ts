import { Result } from "@/models/contracts";
import { ApiMessage } from "@/models/api";
import { ValidationError } from "@/errors";

export interface MessageValidationInterface {
  validateMessage(payload: string): Result<ApiMessage, ValidationError>;
}
