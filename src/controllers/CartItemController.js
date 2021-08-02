import Validator from "../util/Validator.js";
import CartItem from "../models/CartItem.js";

export const addItemToCart = (req, res) => {
  const { body, isLoggedIn, loggedInUser } = req;
  const validatedBody = Validator.cartItemValidator(body);
  if (!validatedBody.product) {
    throw `item id is required for this operation`;
  }
  if (!isLoggedIn) {
    res.status(401).send("Unauthorized");
    return;
  }
  new CartItem({ ...validatedBody, user: loggedInUser })
    .save()
    .then((result) => res.send(true))
    .catch((err) => res.status(500).send(err));
};
