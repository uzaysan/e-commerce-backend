const database = require("../controllers/DatabaseController").database;

class Query {
  constructor(collection) {
    this.collection = database.collection(collection);
  }

  findWithId(_id) {
    const query = { _id: _id };
    const options = {};
    return this.collection.findOne(query, options);
  }
}

module.exports = Query;
