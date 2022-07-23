import { RamDb } from "./ram-db";

test("checks if entry is added to db", () => {

  const db = new RamDb();
  const key = "test-key";
  const result = db.add(key, "value");
  const isSuccess = result.unwrap(() => true, () => false);

  expect(isSuccess).toBe(true);
});

