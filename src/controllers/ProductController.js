const Product = require("../models/Product");
const Session = require("../models/Session");

const addProduct = (req, res) => {
  const { headers, body } = req;
  if (body._id) {
    throw `_id field is auto generated and must be removed from request body!`;
  }
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }
  const token = headers["x-session-token"];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  Session.getUserFromToken(token)
    .then((fetchedUser) => {
      if (!fetchedUser || !fetchedUser._id) throw "Unauthorized";
      return new Product({ ...body, user: fetchedUser._id }).save();
    })
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
};

const editProduct = (req, res) => {
  const { headers, body, params } = req;
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }
  const token = headers["x-session-token"];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  let user;
  let product;
  Session.getUserFromToken(token)
    .then((fetchedUser) => {
      if (!fetchedUser || !fetchedUser._id) throw "Unauthorized";
      user = fetchedUser;
      return Product.getQuery().findWithId(params.objectId);
    })
    .then((fetchedProduct) => {
      product = fetchedProduct;
      if (fetchedProduct.user !== user._id) throw "Unauthorized";
      return new Product({ ...body, _id: params.objectId }).save();
    })
    .then(() => res.send({ ...product, ...body }))
    .catch((err) => res.status(500).send(err));
};

const getProduct = (req, res) => {
  const { params } = req;
  if (!params.objectId) {
    throw `_id field necessary to get an existing object`;
  }
  Product.getQuery()
    .findWithId(params.objectId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteProduct = (req, res) => {
  const { params } = req;
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }
  const token = headers["x-session-token"];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  let user;
  Session.getUserFromToken(token)
    .then((fetchedUser) => {
      if (!fetchedUser || !fetchedUser._id) throw "Unauthorized";
      user = fetchedUser;
      return Product.getQuery().findWithId(params.objectId);
    })
    .then((product) => {
      if (product.user !== user._id) throw "Unauthorized";
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
