import { ErrorCodes } from "@/errors";
import { RamDb } from "./ram-db";

test("checks if entry is added to db", () => {

  const db = new RamDb();
  const key = "test-key";
  const result = db.add(key, "value");
  const isSuccess = result.unwrap(() => true, () => false);

  expect(isSuccess).toBe(true);
});

test("checks if add entry handles error correctly", () => {

  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.add(key, "value");

  const isSuccess = result.unwrap(() => true, () => false);
  expect(isSuccess).toBe(false);

  const isSuccessType = result.unwrap(() => false, (e) => e.id === ErrorCodes.EntryExist);
  expect(isSuccessType).toBe(true);
});

test("checks if add entry gets updated", () => {

  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.update(key, "value2");

  const isSuccess = result.unwrap((value) => value === "value2", () => false);
  expect(isSuccess).toBe(true);
});

test("checks if add entry update error handled correctly", () => {

  const db = new RamDb();
  const key = "test-key";
  const result = db.update(key, "value2");
  const isSuccess = result.unwrap(() => true, () => false);

  expect(isSuccess).toBe(false);

  const isSuccessType = result.unwrap(() => false, (e) => e.id === ErrorCodes.NoEntryExist);
  expect(isSuccessType).toBe(true);
});
