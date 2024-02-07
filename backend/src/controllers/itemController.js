import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

export const editItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body);

    if (updated) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const deleteItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndDelete(req.params.id, req.body);

    if (updated) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
