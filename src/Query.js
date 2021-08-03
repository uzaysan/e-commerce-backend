import DatabaseAdapter from "./adapters/DatabaseAdapter.js";

export default class Query {
  constructor(collection) {
    this.collection = DatabaseAdapter.getCollection(collection);
    this.query = {};
    this.sort = {};
    this.limit = 100;
    if (collection === "User") this.projection = { password: 0, email: 0 };
  }

  setLimit(number) {
    this.limit = parseInt(number || 100);
    return this;
  }

  sortBy(key, direction) {
    this.sort[key] = parseInt(direction);
    return this;
  }

  equalTo(key, value) {
    this.query[key] = value;
    return this;
  }

  async find(options = {}) {
    const newOptions = {
      sort: options.sort || this.sort,
      limit: options.limit || this.limit,
      projection: options.projection || this.projection,
    };
    const cursor = this.collection.find(this.query, newOptions);
    return await cursor.toArray();
  }

  async findOne(options = {}) {
    const newOptions = {
      projection: options.projection || this.projection,
    };
    return this.collection.findOne(this.query, newOptions);
  }

  async findWithId(_id, options = {}) {
    const query = { _id: _id };
    const newOptions = {
      projection: options.projection || this.projection,
    };
    return await this.collection.findOne(query, newOptions);
  }
}
