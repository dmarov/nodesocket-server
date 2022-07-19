import { IdentifiableError } from "@/errors/identifiable-error";
import { ResponseMessage } from "@/models/contracts/response-message";
import { Result } from "@/models/contracts/result";

export interface MessageHandlerInterface {
  addMessage(payload: string): Result<ResponseMessage, IdentifiableError>;
  getMessages(): Result<ResponseMessage[], IdentifiableError>;
}
