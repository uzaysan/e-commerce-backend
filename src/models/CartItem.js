import DatabaseAdapter from "../adapters/DatabaseAdapter.js";
import Query from "../Query.js";

export default class CartItem {
  constructor(item) {
    console.log("Item", item);
    this.item = {};
    if (item._id) this.item._id = `${item.user}${item.product}`;
    if (item.product) this.item.product = item.product;
    this.increment("count", item.count || 1);
    if (item.user) this.item.user = item.user._id;
  }

  increment(key, number = 1) {
    if (!this.operation) this.operation = { $inc: {} };
    this.operation.$inc[key] = parseInt(number);
    console.log("operation", this.operation);
  }

  save() {
    const filter = { _id: `${this.item.user}${this.item.product}` };
    const options = { upsert: true };
    const operation = { $set: { ...this.item }, ...this.operation };
    return DatabaseAdapter.getCollection(this.getCollectionName()).updateOne(
      filter,
      operation,
      options
    );
  }

  static getQuery() {
    return new Query(this.getCollectionName());
  }

  static getCollectionName() {
    return "CartItem";
  }
}
