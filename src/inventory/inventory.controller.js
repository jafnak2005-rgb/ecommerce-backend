import {
  createInventory,
  getInventories,
  getInventoryByVariant,
  updateInventory,
  deleteInventory,
} from "./inventory.service.js";


export const create = async (req, res) => {
  try {
    const inventory = await createInventory(req.body);

    res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAll = async (req, res) => {
  try {
    const inventory = await getInventories();

    res.status(200).json({
      success: true,
      count: inventory.length,
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getByVariant = async (req, res) => {
  try {
    const inventory = await getInventoryByVariant(
      req.params.variantId
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const inventory = await updateInventory(
      req.params.variantId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const inventory = await deleteInventory(
      req.params.variantId
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};