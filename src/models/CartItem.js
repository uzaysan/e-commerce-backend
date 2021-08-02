import { database } from "../controllers/DatabaseController.js";
const cartItems = database.collection("CartItem");

export default class CartItem {
  constructor(item) {
    if (item._id) this.item._id = `${item.user}${item.product}`;
    if (item.product) this.item.product = item.product;
    if (item.count) this.item.count = item.count || 1;
    if (item.user) this.item.user = item.user._id;
  }

  increment(key, number = 1) {
    this.operation.$inc[key] = number;
  }

  save() {
    const filter = { _id: `${this.item.user}${this.item.product}` };
    const options = { upsert: true };
    const operation = { $set: { ...this.item }, ...this.operation };
    return cartItems.updateOne(filter, operation, options);
  }
}
