const database = require("./controllers/DatabaseController").database;

class Query {
  constructor(collection) {
    this.collection = database.collection(collection);
    this.query = {};
  }

  findWithId(_id, options = {}) {
    const query = { _id: _id };
    return this.collection.findOne(query, options);
  }

  equalTo(key, value) {
    this.query[key] = value;
  }

  find(options = {}) {
    return this.collection.findOne(this.query, options);
  }
}

module.exports = Query;
