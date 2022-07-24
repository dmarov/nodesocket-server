import { ErrorCodes } from "@/errors";
import { RamDb } from "@/services/plain-db";
import { UserIdentityPersistenceService } from "./user-identity-persistence";

test("user identities initialized correctly", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db, 10);
  service.initIdentities();
  const result = service.getIdentities();
  const isSuccess = result.unwrap(
    (s) => Array.isArray(s) && s.length === 0,
    () => false,
  );
  expect(isSuccess).toBe(true);
});

test("user identitity add returns success", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db, 10);
  service.initIdentities();

  const user = {
    name: "John Doe",
  };

  const result = service.createIdentity(user);
  expect(result.checkSuccess()).toBe(true);
});

test("user identitity gets added", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db, 10);
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

test("user identitities limit works", () => {
  const db = new RamDb();
  const service = new UserIdentityPersistenceService(db, 3);
  service.initIdentities();

  const user = {
    name: "John Doe",
  };

  service.createIdentity(user);
  service.createIdentity(user);
  service.createIdentity(user);
  const result = service.createIdentity(user);

  const isSuccess = result.unwrap(() => {
    return false
  }, (e) => {
    return e.id === ErrorCodes.LimitExceeded;
  })

  expect(isSuccess).toBe(true);
});
