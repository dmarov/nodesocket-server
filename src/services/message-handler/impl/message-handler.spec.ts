import { MessagePersistenceService } from "@/services/message-persistence";
import { MessageValidationService } from "@/services/message-validation";
import { RamDb } from "@/services/plain-db";
import { MessageHandlerService } from "./message-handler";

function factory() {
  const db = new RamDb();
  const persistance = new MessagePersistenceService(db);
  persistance.initMessages();
  const validation = new MessageValidationService(3, 15);
  return new MessageHandlerService(persistance, validation);
}

test("message add accepted", () => {
  const service = factory();
  const result = service.addMessage({text: "text of message"});
  expect(result.checkSuccess()).toBe(true);
});

test("message add rejected", () => {
  const service = factory();
  const result = service.addMessage({text: "text of message123"});
  expect(result.checkSuccess()).toBe(false);
});

test("messages returned", () => {
  const service = factory();
  const result = service.getMessages();
  expect(result.checkSuccess()).toBe(true);
});
