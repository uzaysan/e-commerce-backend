import Product from "../repositories/Product.js";
import User from "../repositories/User.js";
import ProductService from "../services/ProductService.js";

import Validator from "../util/Validator.js";

export default class ProductController {
  static async addProduct(req, res) {
    const { body, isLoggedIn, loggedInUser } = req;
    try {
      const validatedBody = Validator.productValidator(body);
      if (validatedBody._id)
        throw `_id field is auto generated and must be removed from request body!`;
      if (!validatedBody.title) throw "title field is necessary";
      if (!validatedBody.description) throw "description field is necessary";
      if (!validatedBody.category) throw "category field is necessary";
      if (!validatedBody.price) throw "price field is necessary";
      if (!validatedBody.image) throw "image field is necessary";

      if (!isLoggedIn) {
        res.status(401).send("Unauthorized");
        return;
      }
      res.send(await ProductService.insert(validatedBody, loggedInUser));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async editProduct(req, res) {
    const { body, params, isLoggedIn, loggedInUser } = req;
    const validatedBody = Validator.productValidator(body);
    try {
      if (!params.objectId)
        throw `_id field necessary to edit an existing object`;
      if (
        !validatedBody.title &&
        !validatedBody.description &&
        !validatedBody.category &&
        !validatedBody.price &&
        !validatedBody.image
      )
        throw "You have to pass atleast one ield to edit product";

      if (!isLoggedIn) {
        res.status(401).send("Unauthorized");
        return;
      }

      res.send(
        await ProductService.update(
          params.objectId,
          validatedBody,
          loggedInUser
        )
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getProduct(req, res) {
    const { params } = req;
    if (!params.objectId) throw `_id field necessary to get an existing object`;
    try {
      res.send(await ProductService.get(params.objectId));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async deleteProduct(req, res) {
    const { params, isLoggedIn, loggedInUser } = req;
    try {
      if (!params.objectId)
        throw `_id field necessary to edit an existing object`;

      if (!isLoggedIn) {
        res.status(401).send("Unauthorized");
        return;
      }

      res.send(await ProductService.delete(params.objectId, loggedInUser));
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
