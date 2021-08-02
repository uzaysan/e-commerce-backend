import { database } from "../controllers/DatabaseController.js";
const products = database.collection("Product");
import Query from "../Query.js";
import { generateObjectId } from "../util/ObjectIdUtils.js";

export default class Product {
  constructor(product) {
    if (product._id) this._id = product._id;
    if (product.title) this.title = product.title;
    if (product.description) this.description = product.description;
    if (product.category) this.category = product.category;
    if (product.price) this.price = product.price;
    if (product.image) this.image = product.image;
    if (product.user) this.user = product.user._id;
  }

  save() {
    if (!this._id) {
      return products.insertOne({ ...this, _id: generateObjectId() });
    }
    const filter = { _id: this._id };
    const options = { upsert: false };
    const updateDoc = { $set: { ...this } };
    return products.updateOne(filter, updateDoc, options);
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
