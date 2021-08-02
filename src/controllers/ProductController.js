const Product = require("../models/Product");
const User = require("../models/User");

const Validator = require("../util/Validator");

const addProduct = (req, res) => {
  const { body, isLoggedIn, loggedInUser } = req;
  const validatedBody = Validator.productValidator(body);
  if (validatedBody._id) {
    throw `_id field is auto generated and must be removed from request body!`;
  }
  if (!isLoggedIn) {
    res.status(401).send("Unauthorized");
    return;
  }

  new Product({ ...validatedBody, user: loggedInUser })
    .save()
    .then((result) =>
      res.send({ ...validatedBody, user: loggedInUser, _id: result.insertedId })
    )
    .catch((err) => res.status(500).send(err));
};

const editProduct = (req, res) => {
  const { body, params, isLoggedIn, loggedInUser } = req;
  const validatedBody = Validator.productValidator(body);
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }
  if (!isLoggedIn) {
    res.status(401).send("Unauthorized");
    return;
  }
  let product;
  Product.getQuery()
    .findWithId(params.objectId)
    .then((fetchedProduct) => {
      product = fetchedProduct;
      if (fetchedProduct.user !== loggedInUser._id) throw "Unauthorized";
      return new Product({ ...validatedBody, _id: params.objectId }).save();
    })
    .then(() => res.send({ ...product, ...validatedBody, user: loggedInUser }))
    .catch((err) => res.status(500).send(err));
};

const getProduct = (req, res) => {
  const { params } = req;
  if (!params.objectId) {
    throw `_id field necessary to get an existing object`;
  }
  let product;
  Product.getQuery()
    .findWithId(params.objectId)
    .then((fetchedProduct) => {
      if (!fetchedProduct) throw "Product doesnt exist!";
      product = fetchedProduct;
      return User.getQuery().findWithId(fetchedProduct.user);
    })
    .then((fetchedUser) => {
      res.send({ ...product, user: fetchedUser });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteProduct = (req, res) => {
  const { params, isLoggedIn, loggedInUser } = req;
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }

  if (!isLoggedIn) {
    res.status(401).send("Unauthorized");
    return;
  }
  return Product.getQuery()
    .findWithId(params.objectId)
    .then((product) => {
      if (product.user !== loggedInUser._id) throw "Unauthorized";
      return new Product({ _id: params.objectId }).delete();
    })
    .then(() => res.send("Item Deleted"))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
};
