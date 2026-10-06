import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.service.js";


export const create = async (req, res) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getAll = async (req, res) => {
  try {
    const categories = await getCategories();

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getOne = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const category = await updateCategory(
      req.params.id,
      req.body
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};