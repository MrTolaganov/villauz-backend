export default class BaseError extends Error {
  status: number;
  errors: object | undefined;
  constructor(status: number, message: string, errors?: object) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new BaseError(401, "User is unauthorized");
  }
  static BadRequest(message: string, errors = []) {
    return new BaseError(400, message, errors);
  }
}
