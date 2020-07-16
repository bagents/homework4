const { ValidationError } = require('../middleware/errors/validationError');
const { DbError } = require('../middleware/errors/dbError');

module.exports = class DbService {
  constructor(modelObj) {
    this.Model = modelObj.model;
  }

  static async tryAction(action) {
    try {
      return await action();
    } catch (exception) {
      throw (
        exception.code === 11000
                || exception.stack.includes('ValidationError')
                || (exception.reason !== undefined && exception.reason.code === 'ERR_ASSERTION')
          ? new ValidationError() : new DbError()
      );
    }
  }

  async findMany(query) {
    return DbService.tryAction(() => this.Model.find(query).select('-_id -__v'));
  }

  async create(record) {
    return DbService.tryAction(() => new this.Model(record).save());
  }
};
