import { injectable } from "inversify";
import { PlainDb } from "../plain-db";
import { Result } from "../../../models/contracts/result";
import { IdentifiableError } from "../../../errors/identifiable-error";
import { EntryExistError } from "../../../errors/entry-exist";
import { NoEntryExistError } from "../../../errors/no-entry-exist";

@injectable()
export class RamDb implements PlainDb {
  private readonly entries: {[key: string]: unknown} = {};

  add<T>(key: string, value: T): Result<T, IdentifiableError> {
    if (this.hasEntry((key))) {
      return Result.error(new EntryExistError());
    }

    this.entries[key] = value;

    return Result.success(this.entries[key] as T);
  }

  update<T>(key: string, value: T): Result<T, IdentifiableError> {
    if (!this.hasEntry(key)) {
      return Result.error(new NoEntryExistError());
    }

    this.entries[key] = value;

    return Result.success(this.entries[key] as T);
  }

  delete<T>(key: string, value: T): Result<T, IdentifiableError> {
    if (!this.hasEntry(key)) {
      return Result.error(new NoEntryExistError());
    }

    this.entries[key] = value;

    return Result.success(this.entries[key] as T);
  }

  get<T>(key: string): Result<T, IdentifiableError> {
    if (!this.hasEntry(key)) {
      return Result.error(new NoEntryExistError());
    }

    return Result.success(this.entries[key] as T);
  }

  private hasEntry(key: string): boolean {
    return Object.keys(this.entries).includes(key);
  }
}