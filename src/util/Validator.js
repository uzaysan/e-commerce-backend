export default class Validator {
  static productValidator(body) {
    return {
      _id: body._id,
      title: body.title,
      description: body.description,
      category: body.category,
      price: body.price,
      image: body.image,
    };
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
    return {
      _id: body._id,
      product: body.product,
      count: parseInt(body.count) || 1,
      user: body.user,
    };
  }
}
