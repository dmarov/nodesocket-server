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

  unwrap<T>(onSuccess: (s: S) => T, onError: (e: E) => T) {
    if (this.isSuccess) {
      return onSuccess(this.successPayload!);
    } else {
      return onError(this.errorPayload!);
    }
  }

  unwrapError(onError: (e: E) => S) {
    return this.unwrap(s => s, e => onError(e));
  }

  mapSuccess<T>(onSuccess: (s: S) => T): Result<T, E> {
    return this.unwrap((success) => {
      return Result.success(onSuccess(success));
    }, (error) => {
      return Result.error(error);
    });
  }

  mapError<T>(onError: (e: E) => T): Result<S, T> {
    return this.unwrap((success) => {
      return Result.success(success);
    }, (error) => {
      return Result.error(onError(error));
    });
  }

  checkSuccess() {
    return this.unwrap(() => true, () => false);
  }

  mergeError<S1>(onSuccess: (s: S) => Result<S1, E>): Result<S1, E> {
    if (this.checkSuccess()) {
      return onSuccess(this.successPayload!);
    } else {
      return Result.error(this.errorPayload!);
    }
  }
}
