import { MessageValidationService } from "./message-validation";

function factory() {
  return new MessageValidationService(3, 7);
}

test("message validation undefined rejected", () => {
  const service = factory();

  const message: unknown = {};

  expect(service.validateMessage(message).checkSuccess()).toBe(false);
});

test("message validation minimum limit rejected", () => {
  const service = factory();

  const message: unknown = {
    text: "a",
  };

  expect(service.validateMessage(message).checkSuccess()).toBe(false);
});

test("message validation minimum limit accepted", () => {
  const service = factory();

  const message: unknown = {
    text: "abc",
  };

  expect(service.validateMessage(message).checkSuccess()).toBe(true);
});

test("message validation maximum limit rejected", () => {
  const service = factory();

  const message: unknown = {
    text: "abc defg",
  };

  expect(service.validateMessage(message).checkSuccess()).toBe(false);
});

test("message validation maximum limit accepted", () => {
  const service = factory();

  const message: unknown = {
    text: "abc deg",
  };

  expect(service.validateMessage(message).checkSuccess()).toBe(true);
});
