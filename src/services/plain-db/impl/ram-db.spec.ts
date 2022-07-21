import { RamDb } from "./ram-db.ts";

describe('RamDb tests', () => {
  it('checks if entry is added to db', () => {
    const db = new RamDb();
    const key = 'test-key';
    db.add(key, "value");
    const result = db.add<string>(key, "value");

    const isSuccess = result.unwrap(() => true,() => false);

    expect(isSuccess).toBeTrue();
  })
});
