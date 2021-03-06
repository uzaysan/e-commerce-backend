import DatabaseAdapter from "./adapters/DatabaseAdapter.js";

export default class Query {
  constructor(collection) {
    this.collection = DatabaseAdapter.getCollection(collection);
    this.collectionName = collection;
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

  containedIn(key, value) {
    this.query[key] = { $in: value };
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
    return await this.collection.findOne(this.query, newOptions);
  }

  async findWithId(_id, options = {}) {
    const query = { _id: _id };
    const newOptions = {
      projection: options.projection || this.projection,
    };
    const document = await this.collection.findOne(query, newOptions);
    if (document) return document;
    else throw new Error(`${this.collectionName} ${_id} doesn't exists`);
  }
}
