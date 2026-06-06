const Article = require("../models/article");

// GET ARTICLES
const getArticles = async (
  req,
  res
) => {
  try {
    const articles =
      await Article.find();

    res.status(200).json(
      articles
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// CREATE ARTICLE
const createArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.create(
        req.body
      );

    res.status(201).json(
      article
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// UPDATE ARTICLE
const updateArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(
      article
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// DELETE ARTICLE
const deleteArticle = async (
  req,
  res
) => {
  try {
    await Article.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Article deleted",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};