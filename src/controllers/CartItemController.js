import Validator from "../util/Validator.js";
import CartItemService from "../services/CartItemService.js";

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

      res.send(
        await CartItemService.addItemToCart(validatedBody, loggedInUser)
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getCartItems(req, res) {
    const { body, isLoggedIn, loggedInUser } = req;
    try {
      if (!isLoggedIn) {
        res.status(401).send("Unauthorized");
        return;
      }

      res.send(await CartItemService.getItems(body, loggedInUser));
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
