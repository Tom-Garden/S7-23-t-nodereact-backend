import Category from "../models/categories.js";

const categoryOne = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ _id: id });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find({  });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

const newCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryUpdate = await Category.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(categoryUpdate);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Category.deleteOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllCategories, categoryOne, newCategory, editCategory, deleteCategory };
