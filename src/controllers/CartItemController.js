import Validator from "../util/Validator.js";
import CartItem from "../models/CartItem.js";

export default class CartItemController {
  static async addItemToCart(req, res) {
    const { body, isLoggedIn, loggedInUser } = req;
    try {
      const validatedBody = Validator.cartItemValidator(body);
      if (!validatedBody.product)
        throw `product is required for this operation`;
      if (!isLoggedIn) {
        res.status(401).send("Unauthorized");
        return;
      }

      const result = await new CartItem({
        ...validatedBody,
        user: loggedInUser,
      }).save();
      res.send(result);
    } catch (err) {
      console.log("Error", err);
      res.status(500).send(err);
    }
  }

  static async getCartItems(req, res) {
    const { body, isLoggedIn, loggedInUser } = req;
    if (!isLoggedIn) {
      res.status(401).send("Unauthorized");
      return;
    }
    try {
      const query = CartItem.getQuery();
      query.equalTo("user", loggedInUser._id);
      query.setLimit(body.limit);
      const result = await query.find();
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
