const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static findAll() {
    return items;
  }

  // Find item with matching name
  static find(name) {
    const foundItem = items.find((i) => i.name === name);
    if (foundItem === undefined) {
      throw { message: "Not found", status: 404 };
    }
    return foundItem;
  }

  //   Update found item
  static update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) {
      throw { message: "Not found", status: 404 };
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  //   Delete item
  static remove(name) {
    let foundIndex = items.foundIndex((i) => i.name === name);
    if (foundIndex === -1) {
      throw { message: "Not found", status: 404 };
    }
    items.splice(foundIndex, 1);
  }
}

module.exports = Item;
