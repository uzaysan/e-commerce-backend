import { database } from "./controllers/DatabaseController.js";

export default class Query {
  constructor(collection) {
    this.collection = database.collection(collection);
    this.query = {};
    this.sort = {};
    this.limit = 100;
    if (collection === "User") this.projection = { password: 0, email: 0 };
  }

  findWithId(_id, options = {}) {
    const query = { _id: _id };
    const newOptions = {
      projection: options.projection || this.projection,
    };
    return this.collection.findOne(query, newOptions);
  }

  setLimit(number) {
    this.limit = parseInt(number || 100);
  }

  sortBy(key, direction) {
    this.sort[key] = parseInt(direction);
  }

  equalTo(key, value) {
    this.query[key] = value;
  }

  find(options = {}) {
    return new Promise((resolve, reject) => {
      const newOptions = {
        sort: options.sort || this.sort,
        limit: options.limit || this.limit,
        projection: options.projection || this.projection,
      };
      const cursor = this.collection.find(this.query, newOptions);
      cursor
        .toArray()
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    });
  }

  findOne(options = {}) {
    const newOptions = {
      projection: options.projection || this.projection,
    };
    return this.collection.findOne(this.query, newOptions);
  }
}
