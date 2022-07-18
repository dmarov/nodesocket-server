import { Result } from "../../models/contracts/result";
import { Message } from "../../models/api/message";
import { ValidationError } from "../../errors/validation";

@injectable()
export interface MessageValidationInterface {
  validateMessage(payload: string): Result<Message, ValidationError>;
}
