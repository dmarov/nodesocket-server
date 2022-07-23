import { ErrorCodes } from "@/errors";
import { RequestMessage } from "@/models/contracts";
import { DbMessage } from "@/models/entities";
import { RamDb } from "@/services/plain-db";
import { MessagePersistenceService } from "./message-persistence";

test("messages initialization works", () => {
  const db = new RamDb();
  const service = new MessagePersistenceService(db);
  service.initMessages();
  const result = service.getMessages();
  const isSuccess = result.unwrap(
    (s) => Array.isArray(s) && s.length === 0,
    () => false,
  );
  expect(isSuccess).toBe(true);
});

test("messages double initialization returns error", () => {
  const db = new RamDb();
  const service = new MessagePersistenceService(db);
  service.initMessages();
  const result = service.initMessages();
  const isSuccess = result.unwrap(
    () => false,
    (e) => e.id === ErrorCodes.EntryExist,
  );
  expect(isSuccess).toBe(true);
});

test("message add returns correct value", () => {
  const db = new RamDb();
  const service = new MessagePersistenceService(db);
  service.initMessages();

  const message: RequestMessage = {
    text: "text of message",
  };

  const result = service.addMessage(message);

  const isSuccess = result.unwrap(
    (s) => s.text === "text of message",
    () => false,
  );

  expect(isSuccess).toBe(true);
});

test("message added", () => {
  const db = new RamDb();
  const service = new MessagePersistenceService(db);
  service.initMessages();

  const message: RequestMessage = {
    text: "text of message",
  };

  service.addMessage(message);

  const result = service.getMessages();
  const isSuccess = result.unwrap(
    (s) => s.length === 1 && s[0].text === "text of message",
    () => false,
  );

  expect(isSuccess).toBe(true);
});
