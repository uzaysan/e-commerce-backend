const database = require("../controllers/DatabaseController").database;
const products = database.collection("Product");
const Query = require("../util/Query");

class Product {
  constructor(product, isNew = false) {
    if (isNew) {
      if (!product._id) throw "_id field is required for product";
      if (!product.title) throw "title field is required for product";
      if (!product.description)
        throw "description field is required for product";
      if (!product.category) throw "category field is required for product";
      if (!product.price) throw "price field is required for product";
      if (!product.image) throw "image field is required for product";
    }
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

  save(isNew = false) {
    if (isNew) return products.insertOne(this);
    else {
      const filter = { _id: this._id };
      const options = { upsert: false };
      const updateDoc = { $set: { ...this } };
      return products.updateOne(filter, updateDoc, options);
    }
  }

  static getQuery() {
    return new Query("Product");
  }
}

module.exports = Product;
