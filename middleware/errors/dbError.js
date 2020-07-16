module.exports = class DbError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
