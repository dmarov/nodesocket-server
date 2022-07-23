import { Result } from "./result";

test("result success constructed correctly", () => {
  const result = Result.success("success value");
  const s = result.unwrap(s => s, () => null);
  expect(s).toEqual("success value");
});

test("result error constructed correctly", () => {
  const result = Result.error("error value");
  const e = result.unwrap(() => null, e => e);
  expect(e).toEqual("error value");
});

test("result map success works", () => {
  const result = Result.success("success value")
    .mapSuccess(() => "works");
  const s = result.unwrap(s => s, () => null);
  expect(s).toEqual("works");
});

test("result map error works", () => {
  const result = Result.error("error value")
    .mapError(() => "works");
  const s = result.unwrap(() => null, e => e);
  expect(s).toEqual("works");
});
