import ArticleList from "../components/ArticleList";
import Button from "../components/Button";
import { getArticles } from "../services/ArticleService";
import defaultArticles from "../assets/article-content";
import { useEffect, useState } from "react";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const apiArticles = await getArticles();

      // ONLY ACTIVE ARTICLES
      const activeApiArticles = apiArticles.filter(
        (article) => article.status === "Active"
      );

      // COMBINE DEFAULT + ACTIVE API ARTICLES
      const allArticles = [
        ...defaultArticles,
        ...activeApiArticles,
      ];

      setArticles(allArticles);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#03191d] via-[#07252c] to-[#12343f] text-white">

      {/* HEADER */}
      <section className="px-6 pt-32 pb-16">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
          Articles
        </p>

        <h1 className="mt-4 max-w-2xl text-5xl font-black leading-tight !text-white">
          Featured Articles
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Live and breathe gaming content. From in-depth guides to honest
          reviews, we cover it all.
        </p>

        <div className="mt-8">
          <Button to="/">Back Home</Button>
        </div>

      </section>

      {/* ARTICLES */}
      <section className="border-t border-teal-900/30 bg-[#081f24]/80 px-6 py-12">

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
            Featured Articles
          </p>

          <h2 className="mt-3 text-4xl font-bold !text-white">
            Latest Topics
          </h2>

        </div>

        <ArticleList articles={articles} />

      </section>

    </div>
  );
};

export default ArticleListPage;