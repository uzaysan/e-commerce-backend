export default class Validator {
  static productValidator(body) {
    const newBody = {};
    if (body._id) newBody._id = body._id;
    if (body.title) newBody.title = body.title;
    if (body.description) newBody.description = body.description;
    if (body.category) newBody.category = body.category;
    if (body.price) newBody.price = body.price;
    if (body.image) newBody._id = body.image;
    return newBody;
  }

  static userValidator(body) {
    return {
      _id: body._id,
      name: body.name,
      email: body.email,
      password: body.password,
    };
  }

  static cartItemValidator(body) {
    const newBody = {};
    if (body._id) newBody._id = body._id;
    if (body.product) newBody.product = body.product;
    if (body.count) newBody.count = body.count;
    if (body.user) newBody.user = body.user;
    return newBody;
  }
}
