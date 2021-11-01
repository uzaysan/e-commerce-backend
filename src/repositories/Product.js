import DatabaseAdapter from "../adapters/DatabaseAdapter.js";
import Query from "../Query.js";
import { generateObjectId } from "../util/ObjectIdUtils.js";

export default class Product {
  constructor(product) {
    if (product._id) this._id = product._id;
    if (product.title) this.title = product.title;
    if (product.description) this.description = product.description;
    if (product.category) this.category = product.category;
    if (product.price) this.price = parseInt(product.price);
    if (product.image) this.image = product.image;
    if (product.user) this.user = product.user._id;

    const titleWords = product.title ? product.title.split(/\s+/) : [];
    this.keywords = titleWords.concat(
      product.description ? product.description.split(/\s+/) : []
    );
  }

  async save() {
    if (!this._id) {
      return await DatabaseAdapter.getCollection(
        Product.getCollectionName()
      ).insertOne({ ...this, _id: generateObjectId() });
    }

    const filter = { _id: this._id };
    const options = { upsert: false };
    const updateDoc = { $set: { ...this } };

    return await DatabaseAdapter.getCollection(
      Product.getCollectionName()
    ).updateOne(filter, updateDoc, options);
  }

  async delete() {
    if (!this._id) throw new Error(`Can't delete object without objectId`);
    const query = { _id: this._id };
    return await DatabaseAdapter.getCollection(
      Product.getCollectionName()
    ).deleteOne(query);
  }

  static getQuery() {
    return new Query(this.getCollectionName());
  }

  static getCollectionName() {
    return "Product";
  }
}
