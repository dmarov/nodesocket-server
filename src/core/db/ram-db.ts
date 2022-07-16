import { injectable } from "inversify";
import { EntryExistError } from "./errors/entry-exist";
import { NoEntryExistError } from "./errors/no-entry-exist";

export interface IRamDb {
  add<T>(key: string, value: T): T;
  update<T>(key: string, value: T): T;
  delete<T>(key: string, value: T): T;
  get<T>(key: string): T;
}

@injectable()
export class RamDb implements IRamDb {
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

  private hasEntry(key: string) {
    return Object.keys(this.entries).includes(key);
  }
}
