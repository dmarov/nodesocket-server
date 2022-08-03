import { RamDb } from "@/services/plain-db";
import { UserIdentityPersistenceService } from "@/services/user-identity-persistence";
import { SessionService } from "./session";

function factory() {
  const db = new RamDb();
  const s = new UserIdentityPersistenceService(db, 4);

  return new SessionService(db, s);
}

test("session gets created", () => {
  const service = factory();
  service.createUserSession("123");
  const result = service.getUserSession("123");
  expect(result.checkSuccess()).toBe(true);
});
