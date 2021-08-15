export default class ProductValidator {
  static addProductValidator(req, res, next) {
    const body = ProductValidator.trimBody(req.body);
    const errors = [];
    if (!req.isLoggedIn) errors.push("Unauthorized");
    if (body._id)
      errors.push(
        '"_id field is auto generated and must be removed from request body!"'
      );
    if (!body.description && !body.description.length < 1)
      errors.push("description field is necessary");
    if (!body.title && !body.title.length < 1)
      errors.push("title field is necessary");
    if (!body.category && !body.category.length < 1)
      errors.push("category field is necessary");
    if (!body.image && !body.image.length < 1)
      errors.push("image field is necessary");
    if (!body.price && typeof body.price !== "number")
      errors.push("price field is necessary");

    req.body = body;
    if (errors.length > 0) req.errors = errors;
    next();
  }

  static editProductValidator(req, res, next) {
    const body = ProductValidator.trimBody(req.body);
    const errors = [];
    if (!req.isLoggedIn) errors.push("Unauthorized");
    if (!req.params.objectId)
      errors.push("Url must include object id to edit product!");

    req.body = body;
    if (errors.length > 0) req.errors = errors;
    next();
  }

  static getProductValidator(req, res, next) {
    const errors = [];
    if (!req.params.objectId)
      errors.push("Url must include object id to get product!");

    if (errors.length > 0) req.errors = errors;
    next();
  }

  static deleteProductValidator(req, res, next) {
    const errors = [];
    if (!req.isLoggedIn) errors.push("Unauthorized");
    if (!req.params.objectId)
      errors.push("Url must include object id to delete product!");

    if (errors.length > 0) req.errors = errors;
    next();
  }

  static trimBody(body) {
    const newBody = {};
    if (body._id) newBody._id = body._id;
    if (body.title) newBody.title = body.title;
    if (body.description) newBody.description = body.description;
    if (body.category) newBody.category = body.category;
    if (body.price) newBody.price = body.price;
    if (body.image) newBody.image = body.image;
    return newBody;
  }
}
