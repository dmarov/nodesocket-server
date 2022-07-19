import { IdentifiableError } from "@/errors";
import { Result } from "@/models/contracts";

export interface PlainDb {
  add<T>(key: string, value: T): Result<T, IdentifiableError>;
  update<T>(key: string, value: T): Result<T, IdentifiableError>;
  delete<T>(key: string): Result<T, IdentifiableError>;
  get<T>(key: string): Result<T, IdentifiableError>;
}
