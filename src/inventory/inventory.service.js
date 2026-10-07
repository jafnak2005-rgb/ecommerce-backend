import Inventory from "./inventory.model.js";
import ProductVariant from "../productvariant/productvariant.model.js";

export const createInventory = async (data) => {
  const { productVariant } = data;

  const variant = await ProductVariant.findById(
    productVariant
  );

  if (!variant) {
    throw new Error("Product variant not found");
  }

  const existingInventory =
    await Inventory.findOne({ productVariant });

  if (existingInventory) {
    throw new Error(
      "Inventory already exists for this product variant"
    );
  }

  return await Inventory.create({
    productVariant,
    reserved: 0,
  });
};


export const getInventories = async () => {
  return await Inventory.find()
    .populate({
      path: "productVariant",
      populate: {
        path: "product",
      },
    });
};


export const getInventoryByVariant = async (variantId) => {
  const inventory = await Inventory.findOne({
    productVariant: variantId,
  }).populate({
    path: "productVariant",
    populate: {
      path: "product",
    },
  });

  if (!inventory) {
    return null;
  }

  return inventory;
};


export const updateInventory = async (variantId, data) => {
  const variant = await ProductVariant.findById(
    variantId
  );

  if (!variant) {
    throw new Error("Product variant not found");
  }

  if (data.stock !== undefined) {
    if (data.stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    variant.stock = data.stock;

    await variant.save();
  }

  if (data.reserved !== undefined) {
    if (data.reserved < 0) {
      throw new Error("Reserved stock cannot be negative");
    }

    if (data.reserved > variant.stock) {
      throw new Error(
        "Reserved stock cannot exceed available stock"
      );
    }
  }

  const inventory = await Inventory.findOneAndUpdate(
    { productVariant: variantId },
    {
      reserved:
        data.reserved !== undefined
          ? data.reserved
          : 0,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "productVariant",
    populate: {
      path: "product",
    },
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  return inventory;
};


export const deleteInventory = async (variantId) => {
  return await Inventory.findOneAndDelete({
    productVariant: variantId,
  });
};