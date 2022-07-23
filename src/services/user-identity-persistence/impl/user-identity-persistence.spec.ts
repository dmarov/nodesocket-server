import { RamDb } from "@/services/plain-db";
import { UserIdentityPersistenceService } from "./user-identity-persistence";

test("user identities initialized correctly", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db);
  service.initIdentities();
  const result = service.getIdentities();
  const isSuccess = result.unwrap(
    (s) => Array.isArray(s) && s.length === 0,
    () => false,
  );
  expect(isSuccess).toBe(true);
});
