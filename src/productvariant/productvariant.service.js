import ProductVariant from "./productvariant.model.js";

export const createProductVariant = async (data) => {
  return await ProductVariant.create(data);
};

export const getProductVariants = async () => {
  return await ProductVariant.find().populate("product");
};

export const getProductVariantById = async (id) => {
  return await ProductVariant.findById(id).populate("product");
};

export const updateProductVariant = async (id, data) => {
  return await ProductVariant.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteProductVariant = async (id) => {
  return await ProductVariant.findByIdAndDelete(id);
};