const Product = require("../models/Product");
const { mongoErrorConverter } = require("../util/ErrorHandler");

const addProduct = (req, res) => {
  const { headers, body, params } = req;
  if (body._id) {
    throw `_id field is auto generated and must be removed from request body!`;
  }
  new Product(body)
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
};

const editProduct = (req, res) => {
  const { headers, body, params } = req;
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }
  new Product({ ...body, _id: params.objectId })
    .save()
    .then((result) => {
      if (result.matchedCount === 0) {
        const error = mongoErrorConverter({ code: 1 });
        res.status(error.status).send(error);
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getProduct = (req, res) => {
  const { params } = req;
  if (!params.objectId) {
    throw `_id field necessary to get an existing object`;
  }
  Product.getQuery()
    .findWithId(params.objectId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteProduct = (req, res) => {
  const { params } = req;
  if (!params.objectId) {
    throw `_id field necessary to delete an object`;
  }

  new Product({ _id: params.objectId })
    .delete()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
};
