export interface PlainDb {
  add<T>(key: string, value: T): T;
  update<T>(key: string, value: T): T;
  delete<T>(key: string, value: T): T;
  get<T>(key: string): T;
}
