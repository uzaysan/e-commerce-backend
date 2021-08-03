import Product from "../models/Product.js";
import User from "../models/User.js";

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

      const result = await new Product({
        ...validatedBody,
        user: loggedInUser,
      }).save();
      res.send({
        ...validatedBody,
        user: loggedInUser,
        _id: result.insertedId,
      });
    } catch (err) {
      console.log("Error", err);
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

      const product = await Product.getQuery().findWithId(params.objectId);
      console.log("Product", product);
      if (product.user !== loggedInUser._id) throw "Unauthorized";
      await new Product({ ...validatedBody, _id: params.objectId }).save();
      res.send({ ...product, ...validatedBody, user: loggedInUser });
    } catch (err) {
      console.log("Error", err);
      res.status(500).send(err);
    }
  }

  static async getProduct(req, res) {
    const { params } = req;
    if (!params.objectId) throw `_id field necessary to get an existing object`;
    try {
      const product = await Product.getQuery().findWithId(params.objectId);
      if (!product) throw "Product doesnt exist!";
      const user = await User.getQuery().findWithId(product.user);
      res.send({ ...product, user: user });
    } catch (err) {
      console.log("Error", err);
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

      const product = await Product.getQuery().findWithId(params.objectId);
      if (!product) throw "Object doesnt exists!";
      if (product.user !== loggedInUser._id) throw "Unauthorized";
      await new Product({ _id: params.objectId }).delete();
      res.send("Item deleted");
    } catch (err) {
      console.log("Error", err);
      res.status(500).send(err);
    }
  }
}
