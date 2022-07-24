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

test("user identitiy add returns success", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db);
  service.initIdentities();

  const user = {
    name: "John Doe",
  };

  const result = service.createIdentity(user);
  expect(result.checkSuccess()).toBe(true);
});

test("user identitiy gets added", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db);
  service.initIdentities();

  const user = {
    name: "John Doe",
  };

  service.createIdentity(user);
  const result = service.getIdentities();

  const isSuccess = result.unwrap(users => {
    return users.length === 1 && users[0].name === "John Doe" && users[0].id.length > 0
  }, () => {
    return false;
  })

  expect(isSuccess).toBe(true);
});
