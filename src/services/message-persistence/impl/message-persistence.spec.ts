import { RamDb } from "@/services/plain-db";
import { MessagePersistenceService } from "./message-persistence";

test("messages initialization works", () => {
  const db = new RamDb();
  const service = new MessagePersistenceService(db);
  const result = service.initMessages();
  const isSuccess = result.unwrap(() => true, () => false);
  expect(isSuccess).toBe(true);
});
