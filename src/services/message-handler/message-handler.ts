import { IdentifiableError } from "@/errors";
import { ResponseMessage, Result } from "@/models/contracts";

export interface MessageHandlerInterface {
  addMessage(payload: string): Result<ResponseMessage, IdentifiableError>;
  getMessages(): Result<ResponseMessage[], IdentifiableError>;
}
