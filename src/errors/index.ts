export class InvalidIdError extends Error {
  constructor(message: string = "Invalid ID") {
    super(message);
    this.name = "InvalidIdError";
  }
}
