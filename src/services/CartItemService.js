import CartItem from "../repositories/CartItem.js";

export default class CartItemService {
  static async addItemToCart(body, user) {
    await new CartItem({ ...body, user: user }).save();
    return { result: "items added to cart" };
  }

  static async getItems(body, user) {
    const query = CartItem.getQuery();
    query.equalTo("user", user._id);
    query.setLimit(body.limit);
    return await query.find();
  }
}
