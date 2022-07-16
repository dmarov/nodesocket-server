import { injectable } from "inversify";
import { EntryExistError } from "../errors/entry-exist";
import { NoEntryExistError } from "../errors/no-entry-exist";
import { PlainDb } from "../plain-db";

@injectable()
export class RamDb implements PlainDb {
  private readonly entries: {[key: string]: unknown} = {};

  add<T>(key: string, value: T): T {
    if (this.hasEntry((key))) {
      throw new EntryExistError();
    }

    this.entries[key] = value;

    return this.entries[key] as T;
  }

  update<T>(key: string, value: T): T {
    if (!this.hasEntry(key)) {
      throw new NoEntryExistError();
    }

    this.entries[key] = value;

    return this.entries[key] as T;
  }

  delete<T>(key: string, value: T): T {
    if (!this.hasEntry(key)) {
      throw new NoEntryExistError();
    }

    this.entries[key] = value;

    return this.entries[key] as T;
  }

  get<T>(key: string): T {
    if (!this.hasEntry(key)) {
      throw new NoEntryExistError();
    }

    return this.entries[key] as T;
  }

  private hasEntry(key: string): boolean {
    return Object.keys(this.entries).includes(key);
  }
}
