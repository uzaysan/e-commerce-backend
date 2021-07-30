class CartItem {
  constructor(itemId, count) {
    this.itemId = itemId;
    this.count = count;
  }

  incrementCount() {
    this.count++;
  }
}

module.exports = CartItem;
