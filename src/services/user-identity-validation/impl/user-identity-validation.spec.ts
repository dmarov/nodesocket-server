import { UserIdentityValidationService } from "./user-identity-validation";

test("user identitiy validatation accepted", () => {
  const service = new UserIdentityValidationService(3, 10);
  const identity = {
    name: "John Doe",
  };

  const result = service.validateIdentity(identity)

  expect(result.checkSuccess()).toBe(true);
});

