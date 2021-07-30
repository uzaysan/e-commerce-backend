const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).send();
});

module.exports = router;
