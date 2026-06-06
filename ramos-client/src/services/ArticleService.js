import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/articles",
});

// GET ARTICLES
export const getArticles =
  async () => {
    const response =
      await API.get("/");

    return response.data;
  };

// CREATE ARTICLE
export const addArticle =
  async (article) => {
    const response =
      await API.post(
        "/",
        article
      );

    return response.data;
  };

// UPDATE ARTICLE
export const updateArticle =
  async (
    id,
    article
  ) => {
    const response =
      await API.put(
        `/${id}`,
        article
      );

    return response.data;
  };

// DELETE ARTICLE
export const deleteArticle =
  async (id) => {
    const response =
      await API.delete(
        `/${id}`
      );

    return response.data;
  };