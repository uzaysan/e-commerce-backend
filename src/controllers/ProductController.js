import Product from "../models/Product.js";
import User from "../models/User.js";

import Validator from "../util/Validator.js";

export const addProduct = (req, res) => {
  const { body, isLoggedIn, loggedInUser } = req;

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

  new Product({ ...validatedBody, user: loggedInUser })
    .save()
    .then((result) =>
      res.send({ ...validatedBody, user: loggedInUser, _id: result.insertedId })
    )
    .catch((err) => {
      throw err;
    });
};

export const editProduct = (req, res) => {
  const { body, params, isLoggedIn, loggedInUser } = req;
  const validatedBody = productValidator(body);
  if (!params.objectId) throw `_id field necessary to edit an existing object`;
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
  let product;
  Product.getQuery()
    .findWithId(params.objectId)
    .then((fetchedProduct) => {
      product = fetchedProduct;
      if (fetchedProduct.user !== loggedInUser._id) throw "Unauthorized";
      return new Product({ ...validatedBody, _id: params.objectId }).save();
    })
    .then(() => res.send({ ...product, ...validatedBody, user: loggedInUser }))
    .catch((err) => {
      throw err;
    });
};

export const getProduct = (req, res) => {
  const { params } = req;
  if (!params.objectId) throw `_id field necessary to get an existing object`;
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
      throw err;
    });
};

export const deleteProduct = (req, res) => {
  const { params, isLoggedIn, loggedInUser } = req;
  if (!params.objectId) throw `_id field necessary to edit an existing object`;

  if (!isLoggedIn) {
    res.status(401).send("Unauthorized");
    return;
  }
  return getQuery()
    .findWithId(params.objectId)
    .then((product) => {
      if (product.user !== loggedInUser._id) throw "Unauthorized";
      return new Product({ _id: params.objectId }).delete();
    })
    .then(() => res.send("Item Deleted"))
    .catch((err) => {
      throw err;
    });
};
