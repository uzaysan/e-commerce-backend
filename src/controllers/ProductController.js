const Product = require("../models/Product");
const { generateObjectId } = require("../util/ObjectIdUtils");
const { mongoErrorConverter } = require("../util/ErrorHandler");

const addProduct = (req, res) => {
  const { headers, body, params } = req;
  if (body._id) {
    throw `_id field is auto generated and must be removed from request body!`;
  }
  new Product({ ...body, _id: generateObjectId() }, true)
    .save(true)
    .then((result) => {
      if (result.modifiedCount === 0) {
        const error = mongoErrorConverter({ code: 1 });
        res.status(error.status).send(error);
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const editProduct = (req, res) => {
  const { headers, body, params } = req;
  if (!params.objectId) {
    throw `_id field necessary to edit an existing object`;
  }
  new Product({ ...body, _id: params.objectId }, false)
    .save(false)
    .then((result) => {
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

module.exports = {
  addProduct,
  editProduct,
  getProduct,
};
