import Inventory from "./inventory.model.js";

export const createInventory = async (data) => {
  const inventory = await Inventory.create(data);

  return inventory;
};

export const getInventories = async () => {
  return await Inventory.find().populate("product");
};

export const getInventoryByProduct = async (productId) => {
  return await Inventory.findOne({
    product: productId,
  }).populate("product");
};

export const updateInventory = async (productId, data) => {
  return await Inventory.findOneAndUpdate(
    { product: productId },
    data,
    {
      new: true,
      runValidators: true,
    }
  ).populate("product");
};

export const deleteInventory = async (productId) => {
  return await Inventory.findOneAndDelete({
    product: productId,
  });
};