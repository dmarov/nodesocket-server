export class Result<S, E> {
  private constructor(
    private readonly isSuccess: boolean,
    private readonly successPayload: S | null,
    private readonly errorPayload: E | null,
  ) { }

  static success<S, E>(payload: S): Result<S, E> {
    return new Result<S, E>(true, payload, null);
  }

  static error<S, E>(payload: E): Result<S, E> {
    return new Result<S, E>(false, null, payload);
  }

  unwrap<U>(success: (s: S) => U, error: (e: E) => U) {
    if (this.isSuccess) {
      return success(this.successPayload!);
    } else {
      return error(this.errorPayload!);
    }
  }
}
