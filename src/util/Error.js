class Error {
  constructor(err) {
    if (err.code === 1) {
      this.status = 404;
      this.message = `_id field didn't match with any object!`;
    }
  }
}

module.exports = Error;
