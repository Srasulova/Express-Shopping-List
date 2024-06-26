const express = require("express");
const router = new express.Router();
const Item = require("../item");

// Get all items
router.get("", (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (error) {
    return next(error);
  }
});

// Post name and price
router.post("", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

// Get one item
router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({ item: foundItem });
  } catch (error) {
    return next(error);
  }
});

// Update an item
router.patch("/:name", (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (error) {
    return next(error);
  }
});

// Delete item
router.delete("/:name", (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
