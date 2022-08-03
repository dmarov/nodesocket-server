import { ErrorCodes } from "@/errors";
import { RamDb } from "@/services/plain-db";
import {
  UserIdentityPersistenceService,
  UserIdentityValidationService,
} from "@/services";
import { UserIdentityHandlerService } from "./user-identity-handler";

function factory() {
  const db = new RamDb();
  const persistance = new UserIdentityPersistenceService(db, 3);
  persistance.initIdentities();
  const validation = new UserIdentityValidationService(3, 15);
  return new UserIdentityHandlerService(validation, persistance);
}

test("user identity accepted", () => {
  const service = factory();
  const result = service.addIdentity({name: "John Doe"});
  expect(result.checkSuccess()).toBe(true);
});

test("user identity accepted", () => {
  const service = factory();
  service.addIdentity({name: "John Doe"});
  service.addIdentity({name: "John Doe 1"});
  service.addIdentity({name: "John Doe 2"});
  const result = service.addIdentity({name: "John Doe 3"});
  const isSuccess = result.unwrap(() => false, e => e.id === ErrorCodes.LimitExceeded);
  expect(isSuccess).toBe(true);
});
