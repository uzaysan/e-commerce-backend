const database = require("../controllers/DatabaseController").database;
const cartItems = database.collection("CartItem");
const Query = require("../Query");
const { generateObjectId } = require("../util/ObjectIdUtils");

class CartItem {
  constructor(item) {
    if (item._id) this.item._id = `${item.user}${item.product}`;
    if (item.product) this.item.product = item.product;
    if (item.count) this.item.count = item.count;
    if (item.user) this.item.user = item.user;
  }

  increment(key, number = 1) {
    this.operation.$inc[key] = number;
  }

  save() {
    const filter = { _id: `${this.item.user}${this.item.product}` };
    const options = { upsert: true };
    const operation = { $set: { ...this.item }, ...this.operation };
    return products.updateOne(filter, operation, options);
  }
}

module.exports = CartItem;
