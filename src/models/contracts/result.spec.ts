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

test("success result check success works", () => {
  const result = Result.success("success value");
  expect(result.checkSuccess()).toBe(true);
});

test("success result check error works", () => {
  const result = Result.error("error value");
  expect(result.checkSuccess()).toBe(false);
});

test("error result merge error works", () => {
  const result = Result.error("error value")
    .mergeError(() => Result.success({}))
    .unwrap(() => false, e => e === "error value");
  expect(result).toBe(true);
});

test("success result merge error works", () => {
  const result = Result.success("success value")
    .mergeError((s) => Result.success(s + " 1"))
    .unwrap((s) => s === "success value 1", () => false);
  expect(result).toBe(true);
});
