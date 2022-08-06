import { RamDb } from "@/services/plain-db";
import { UserIdentityPersistenceService } from "@/services/user-identity-persistence";
import { SessionService } from "./session";

function factory() {
  const db = new RamDb();
  const s = new UserIdentityPersistenceService(db, 4);
  const service = new SessionService(db, s);

  s.initIdentities();
  service.initUserSessions();

  return service;
}

test("session gets created", () => {
  const service = factory();
  service.createUserSession("123", "John Doe");
  const result = service.getUserSession("123");
  expect(result.checkSuccess()).toBe(true);
});
