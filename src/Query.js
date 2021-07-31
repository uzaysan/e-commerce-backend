const database = require("./controllers/DatabaseController").database;

class Query {
  constructor(collection) {
    this.collection = database.collection(collection);
    this.query = {};
  }

  findWithId(_id) {
    const query = { _id: _id };
    const options = {};
    return this.collection.findOne(query, options);
  }

  equalTo(key, value) {
    this.query[key] = value;
  }

  find() {
    return this.collection.findOne(this.query, {});
  }
}

module.exports = Query;
