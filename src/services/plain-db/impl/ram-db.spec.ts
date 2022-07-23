import { ErrorCodes } from "@/errors";
import { RamDb } from "./ram-db";

test("checks if entry added successfully", () => {
  const db = new RamDb();
  const key = "test-key";
  const result = db.add(key, "value");
  const isSuccess = result.unwrap(() => true, () => false);

  expect(isSuccess).toBe(true);
});

test("checks if add method returns correct data", () => {
  const db = new RamDb();
  const key = "test-key";
  const result = db.add(key, "value");
  const isSuccess = result.unwrap((value) => value, () => null);
  expect(isSuccess).toBe("value");
});

test("checks if add error dispatched correctly", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.add(key, "value");
  const isSuccess = result.unwrap(() => false, (e) => e.id === ErrorCodes.EntryExist);
  expect(isSuccess).toBe(true);
});

test("checks if entry gets updated", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.update(key, "value2");
  const isSuccess = result.unwrap((value) => value === "value2", () => false);
  expect(isSuccess).toBe(true);
});

test("checks if update method returns correct data", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.update(key, "value2");
  const isSuccess = result.unwrap((value) => value, () => null);
  expect(isSuccess).toBe("value2");
});

test("checks if update error dispatched correctly", () => {
  const db = new RamDb();
  const key = "test-key";
  const result = db.update(key, "value2");
  const isSuccess = result.unwrap(() => false, (e) => e.id === ErrorCodes.NoEntryExist);
  expect(isSuccess).toBe(true);
});

test("checks if entry gets deleted", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.delete(key);
  const isSuccess = result.unwrap(() => true, () => false);
  expect(isSuccess).toBe(true);
});

test("checks if delete method returns correct data", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.delete(key);
  const isSuccess = result.unwrap((value) => value, () => null);
  expect(isSuccess).toBe("value");
});

test("checks if delete error dispatched correctly", () => {
  const db = new RamDb();
  const key = "test-key";
  const result = db.delete(key);
  const isSuccess = result.unwrap(() => false, (e) => e.id === ErrorCodes.NoEntryExist);
  expect(isSuccess).toBe(true);
});

test("checks if entry get works", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.get(key);
  const isSuccess = result.unwrap(() => true, () => false);
  expect(isSuccess).toBe(true);
});

test("checks if get method returns correct data", () => {
  const db = new RamDb();
  const key = "test-key";
  db.add(key, "value");
  const result = db.get(key);
  const isSuccess = result.unwrap((value) => value, () => null);
  expect(isSuccess).toBe("value");
});

test("checks if delete error dispatched correctly", () => {
  const db = new RamDb();
  const key = "test-key";
  const result = db.get(key);
  const isSuccess = result.unwrap(() => false, (e) => e.id === ErrorCodes.NoEntryExist);
  expect(isSuccess).toBe(true);
});
