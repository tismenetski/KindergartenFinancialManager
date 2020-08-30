class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message); //Super = get all the default class properties
    this.statusCode = statusCode; //Add statusCode field
  }
}

module.exports = ErrorResponse;
