import {
  createInventory,
  getInventories,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
} from "./inventory.service.js";

export const create = async (req, res) => {
  try {
    const inventory = await createInventory(req.body);

    res.status(201).json({
      message: "Inventory created successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const inventory = await getInventories();

    res.status(200).json({
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getByProduct = async (req, res) => {
  try {
    const inventory = await getInventoryByProduct(req.params.productId);

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const inventory = await updateInventory(
      req.params.productId,
      req.body
    );

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      message: "Inventory updated successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const inventory = await deleteInventory(req.params.productId);

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};