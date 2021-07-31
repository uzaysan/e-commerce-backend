const database = require("../controllers/DatabaseController").database;
const products = database.collection("Product");
const Query = require("../Query");
const { generateObjectId } = require("../util/ObjectIdUtils");

class Product {
  constructor(product) {
    if (product._id) this._id = product._id;
    if (product.title) this.title = product.title;
    if (product.description) this.description = product.description;
    if (product.category) this.category = product.category;
    if (product.price) this.price = product.price;
    if (product.image) this.image = product.image;
  }

  setId(_id) {
    this._id = _id;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setCategory(category) {
    this.category = category;
  }

  setPrice(price) {
    this.price = price;
  }

  setImage(image) {
    this.image = image;
  }

  save() {
    if (!this._id)
      return products.insertOne({ ...this, _id: generateObjectId() });
    else {
      const filter = { _id: this._id };
      const options = { upsert: false };
      const updateDoc = { $set: { ...this } };
      return products.updateOne(filter, updateDoc, options);
    }
  }

  delete() {
    if (!this._id) throw `Can't delete object without objectId`;
    const query = { _id: this._id };
    return products.deleteOne(query);
  }

  static getQuery() {
    return new Query("Product");
  }
}

module.exports = Product;
