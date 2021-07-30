class Product {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
  }

  setId(id) {
    this.id = id;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setCategory(category) {
    this.category = category;
  }

  setPrice(price) {
    this.price = price;
  }

  setImage(image) {
    this.image = image;
  }
}

module.exports = Product;
