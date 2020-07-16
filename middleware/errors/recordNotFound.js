module.exports = class RecordNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
