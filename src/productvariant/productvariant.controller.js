import {
  createProductVariant,
  getProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant,
} from "./productvariant.service.js";

export const create = async (req, res) => {
  try {
    const variant = await createProductVariant(req.body);

    res.status(201).json({
      message: "Product variant created successfully",
      variant,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const variants = await getProductVariants();

    res.status(200).json(variants);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const variant = await getProductVariantById(req.params.id);

    if (!variant) {
      return res.status(404).json({
        message: "Product variant not found",
      });
    }

    res.status(200).json(variant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const variant = await updateProductVariant(
      req.params.id,
      req.body
    );

    if (!variant) {
      return res.status(404).json({
        message: "Product variant not found",
      });
    }

    res.status(200).json({
      message: "Product variant updated successfully",
      variant,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const variant = await deleteProductVariant(req.params.id);

    if (!variant) {
      return res.status(404).json({
        message: "Product variant not found",
      });
    }

    res.status(200).json({
      message: "Product variant deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};