import Category from "./category.model.js";

export const createCategory = async (data) => {
  const { name, description } = data;

  if (!name || !description) {
    throw new Error("Name and description are required");
  }

  const existingCategory = await Category.findOne({
    name: name.trim(),
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    name: name.trim(),
    description: description.trim(),
  });
};


export const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};


export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};


export const updateCategory = async (id, data) => {
  const { name, description } = data;

  const category = await Category.findByIdAndUpdate(
    id,
    {
      name,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};


export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return {
    message: "Category deleted successfully",
  };
};