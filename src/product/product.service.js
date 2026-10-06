import Product from "./product.model.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getProducts = async () => {
  return await Product.find().populate("category");
};

export const getProductById = async (id) => {
  return await Product.findById(id).populate("category");
};

export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};