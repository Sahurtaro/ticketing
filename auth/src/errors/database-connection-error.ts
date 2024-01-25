export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to dababase';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
