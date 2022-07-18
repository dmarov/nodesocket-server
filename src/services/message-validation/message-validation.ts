import { Result } from "../../models/contracts/result";
import { ApiMessage } from "../../models/api/api-message";
import { ValidationError } from "../../errors/validation";

@injectable()
export interface MessageValidationInterface {
  validateMessage(payload: string): Result<ApiMessage, ValidationError>;
}
