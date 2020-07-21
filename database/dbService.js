const { ValidationError } = require('../middleware/errors/validationError');
const { DbError } = require('../middleware/errors/dbError');
const { RecordNotFound } = require('../middleware/errors/recordNotFound');

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

  async findOne(id) {
    const result = await DbService.tryAction(() => this.Model.findOne(id).select('-id -__v'));
    if (result == null) { throw new RecordNotFound(); }
    return result;
  }

  async create(record) {
    return DbService.tryAction(() => new this.Model(record).save());
  }

  async update(id, record) {
    const patchResult = await DbService.tryAction(() => this.Model.findOneAndUpdate(
      id, record, {
        new: true,
      },
    ).select('-_id -__v'));
    if (patchResult == null) {
      throw new RecordNotFound();
    }
    return patchResult;
  }

  async deleteMany(query) {
    if (await DbService.tryAction(() => this.Model.find(query).deleteMany().deletedCount === 0)) {
      throw new RecordNotFound();
    }
  }

  async deleteOne(id) {
    if (await DbService.tryAction(() => this.Model(id).deleteOne().deletedCount === 0)) {
      throw new RecordNotFound();
    }
  }
};
