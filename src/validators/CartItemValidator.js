export default class CartItemValidator {
  static addItemToCartValidator(req, res, next) {
    const body = CartItemValidator.trimBody(req.body);
    const errors = [];
    if (!req.isLoggedIn) errors.push("Unauthorized");
    if (!body.product) errors.push("product field is required");
    if (errors.length > 0) req.errors = errors;
    req.body = body;
    next();
  }

  static getItemsValidator(req, res, next) {
    const errors = [];
    if (!req.isLoggedIn) errors.push("Unauthorized");
    if (errors.length > 0) req.errors = errors;
    next();
  }

  static trimBody(body) {
    const newBody = {};
    if (body._id) newBody._id = body._id;
    if (body.product) newBody.product = body.product;
    if (body.count) newBody.count = body.count;
    if (body.user) newBody.user = body.user;
    return newBody;
  }
}
