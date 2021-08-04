import ProductService from "../services/ProductService.js";

export default class ProductController {
  static async addProductController(req, res) {
    const { body, loggedInUser, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await ProductService.insert(body, loggedInUser));
    } catch (err) {
      res.status(400).send(err.toString());
    }
  }

  static async editProductController(req, res) {
    const { body, params, loggedInUser, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(
        await ProductService.update(params.objectId, body, loggedInUser)
      );
    } catch (err) {
      res.status(400).send(err.toString());
    }
  }

  static async getProductController(req, res) {
    const { params, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await ProductService.get(params.objectId));
    } catch (err) {
      res.status(400).send(err.toString());
    }
  }

  static async deleteProductController(req, res) {
    const { params, loggedInUser, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await ProductService.delete(params.objectId, loggedInUser));
    } catch (err) {
      res.status(400).send(err.toString());
    }
  }
}
