import { RamDb } from "@/services/plain-db";
import { SessionService } from "./session";

function factory() {
  const db = new RamDb();

  return new SessionService(db);
}

test("session gets created", () => {
  const service = factory();
  service.createUserSession("123");
  const result = service.getUserSession("123");
  expect(result.checkSuccess()).toBe(true);
});
