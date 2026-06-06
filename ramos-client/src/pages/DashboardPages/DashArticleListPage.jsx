import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [title, setTitle] = useState("");

  const [preview, setPreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [open, setOpen] = useState(false);

  // LOAD ARTICLES
  const loadArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data);

      setArticles(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // MODAL
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);

    setEditingId(null);

    setTitle("");

    setPreview("");
  };

  // FILTER
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : article.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // SAVE ARTICLE
  const handleSaveArticle = async () => {
    if (!title || !preview) return;

    try {
      if (editingId) {
        await updateArticle(editingId, {
          title,
          preview,
          content: [preview],
        });
      } else {
        await addArticle({
          title,
          preview,

          slug: title.toLowerCase().replace(/\s+/g, "-"),

          content: [preview],

          status: "Active",

          image: "",
        });
      }

      await loadArticles();

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (article) => {
    setEditingId(article._id);

    setTitle(article.title);

    setPreview(article.preview);

    handleOpen();
  };

  // DISABLE
  const handleDisable = async (article) => {
    try {
      const updatedStatus = article.status === "Active" ? "Disabled" : "Active";

      await updateArticle(article._id, {
        status: updatedStatus,
      });

      loadArticles();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);

      loadArticles();

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 850,
    bgcolor: "#041b20",
    border: "1px solid rgba(0,255,200,0.2)",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-5xl font-semibold !text-teal-400">Articles</h1>

        <button
          onClick={handleOpen}
          className="rounded bg-blue-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-blue-500"
        >
          ADD ARTICLE
        </button>
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2 className="mb-8 text-3xl font-semibold !text-cyan-400">
            {editingId ? "Edit Article" : "Add Article"}
          </h2>

          <div className="space-y-5">
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm text-cyan-300">
                Article Title
              </label>

              <input
                type="text"
                placeholder="Enter article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border border-cyan-500/30 bg-[#14141c] p-4 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* PREVIEW */}
            <div>
              <label className="mb-2 block text-sm text-cyan-300">
                Preview
              </label>

              <textarea
                rows="5"
                placeholder="Enter preview"
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                className="w-full rounded border border-cyan-500/30 bg-[#14141c] p-4 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex items-center justify-between pt-4">
              {/* DELETE BUTTON */}
              <div>
                {editingId && (
                  <button
                    onClick={() => handleDelete(editingId)}
                    className="rounded bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-400"
                  >
                    DELETE
                  </button>
                )}
              </div>

              {/* RIGHT BUTTONS */}
              <div className="flex gap-4">
                <button
                  onClick={handleClose}
                  className="rounded border border-cyan-500/30 px-5 py-2 text-white hover:bg-zinc-800"
                >
                  CANCEL
                </button>

                <button
                  onClick={handleSaveArticle}
                  className="rounded bg-cyan-400 px-5 py-2 font-semibold text-black hover:bg-cyan-300"
                >
                  {editingId ? "SAVE CHANGES" : "SAVE"}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* FILTERS */}
      <div className="mb-5 flex gap-4">
        <input
          type="text"
          placeholder="Search Articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded border border-cyan-500/30 bg-[#14141c] p-4 text-white outline-none focus:border-cyan-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-40 rounded border border-cyan-500/30 bg-[#14141c] px-4 text-white outline-none"
        >
          <option value="All">All Statuses</option>

          <option value="Active">Active</option>

          <option value="Disabled">Disabled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded border border-cyan-500/20">
        <table className="w-full border-collapse">
          <thead className="bg-[#1b1b22]">
            <tr className="text-left text-white">
              <th className="p-4">ID</th>

              <th className="p-4">Slug</th>

              <th className="p-4">Title</th>

              <th className="p-4">Paragraphs</th>

              <th className="p-4">Preview</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredArticles.map((article, index) => (
              <tr
                key={article._id}
                className="border-t border-cyan-500/20 bg-[#17353b]"
              >
                <td className="p-4">
                  {`ART-${String(index + 1).padStart(3, "0")}`}
                </td>

                <td className="p-4">{article.slug}</td>

                <td className="p-4">{article.title}</td>

                <td className="p-4">{article.content?.length}</td>

                <td className="p-4">{article.preview}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      article.status === "Active"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-4 text-sm font-semibold uppercase">
                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(article)}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      Edit
                    </button>

                    {/* DISABLE */}
                    <button
                      onClick={() => handleDisable(article)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      {article.status === "Active" ? "Disable" : "Enable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashArticleListPage;
