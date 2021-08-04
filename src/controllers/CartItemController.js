import CartItemService from "../services/CartItemService.js";

export default class CartItemController {
  static async addItemToCart(req, res) {
    const { body, loggedInUser, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await CartItemService.addItemToCart(body, loggedInUser));
    } catch (err) {
      res.status(500).send(err.toString());
    }
  }

  static async getCartItems(req, res) {
    const { body, loggedInUser, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await CartItemService.getItems(body, loggedInUser));
    } catch (err) {
      res.status(500).send(err.toString());
    }
  }
}
