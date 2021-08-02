const express = require("express");
const router = express.Router();

const { getUser } = require("../controllers/UserController");

router.get("/:objectId", getUser);

module.exports = router;
