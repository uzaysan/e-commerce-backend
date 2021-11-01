import Product from "../repositories/Product.js";
import User from "../repositories/User.js";

export default class ProductService {
  static async insert(body, user) {
    const result = await new Product({ ...body, user: user }).save();
    return { ...body, user: user, _id: result.insertedId };
  }

  static async update(objectId, body, user) {
    const product = await Product.getQuery().findWithId(objectId);
    if (product.user !== user._id) throw new Error("Unauthorized");
    await new Product({ ...body, _id: objectId }).save();
    return { ...product, ...body, user: user };
  }

  static async get(objectId) {
    const product = await Product.getQuery().findWithId(objectId);
    if (!product) throw new Error(`Product ${objectId} doesnt exist!`);
    const user = await User.getQuery().findWithId(product.user);
    return { ...product, user: user };
  }

  static async delete(objectId, user) {
    const product = await Product.getQuery().findWithId(objectId);
    if (!product) throw new Error("Object doesnt exists!");
    if (product.user !== user._id) throw new Error("Unauthorized");
    await new Product({ _id: objectId }).delete();
    return { result: "Item deleted" };
  }

  static async search(param) {
    const query = ProductService.getQuery();
    query.containedIn("keywords", [param]);
    const products = await query.find();
    for (const product of products) {
      const user = User.getQuery().findWithId(product.user);
      product.user = user;
    }
    return products;
  }

  static async getAll() {
    const query = ProductService.getQuery();
    query.limit(500);
    const products = await query.find();
    for (const product of products) {
      const user = User.getQuery().findWithId(product.user);
      product.user = user;
    }
    return products;
  }
}
