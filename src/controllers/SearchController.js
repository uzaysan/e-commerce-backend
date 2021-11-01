import ProductService from "../services/ProductService";

export default class SearchController {
  static async searchController(req, res) {
    const { query, errors } = req;
    const searchParam = query.query;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await ProductService.search(searchParam));
    } catch (err) {
      res.status(400).send({ err: err.toString() });
    }
  }
}
