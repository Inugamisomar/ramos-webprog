import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../services/ArticleService";
import defaultArticles from "../assets/article-content";

const ArticlePage = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    try {
     const apiArticles =
  await getArticles();

    const articles = [
  ...defaultArticles,
  ...apiArticles,
];

     const foundArticle =
  articles.find(
    (item) => {

      // USE DATABASE SLUG
      if (
        item.slug &&
        item.slug === slug
      ) {
        return true;
      }

      // FALLBACK FOR OLD ARTICLES
      const generatedSlug =
        item.title
          ?.trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

      return generatedSlug === slug;
    }
  );

      setArticle(foundArticle);
    } catch (error) {
      console.error(error);
    }
  };

  if (!article) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#02161b] text-white">

        <div className="text-center">

          <h1 className="text-7xl font-bold !text-teal-400">
            404
          </h1>

          <p className="mt-4 text-3xl tracking-[0.3em]">
            MISSION FAILED
          </p>

          <div className="mx-auto mt-6 h-1 w-20 bg-teal-400" />

          <p className="mt-6 max-w-md text-lg text-gray-300">
            The link you followed to get here must
            be broken, or the page has been moved.
          </p>

          <Link
            to="/articles"
            className="mt-8 inline-block rounded-full border border-teal-400 px-8 py-3 font-semibold uppercase tracking-[0.2em] text-teal-400 transition hover:bg-teal-400 hover:text-black"
          >
            Return To Base
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#02161b] py-16 text-white">

      <div className="mx-auto w-full max-w-5xl px-6">

        <div className="rounded-[32px] border border-teal-900/30 bg-[#05232a] p-8 shadow-[0_0_40px_rgba(20,184,166,0.08)]">

          {/* BACK BUTTON */}
          <Link
            to="/articles"
            className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 transition hover:text-teal-300"
          >
            ← Back To Articles
          </Link>

          {/* HERO IMAGE */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-teal-900/40 shadow-[0_0_40px_rgba(20,184,166,0.15)]">

            <img
              src={
                article.image ||
                ""
              }
              alt={article.title}
              className="h-[450px] w-full rounded-3xl object-cover"
            />

          </div>

          {/* TITLE */}
          <h1 className="mt-8 text-5xl font-black uppercase tracking-wide !text-teal-400">
            {article.title}
          </h1>


          {/* CONTENT */}
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-200">

            {Array.isArray(article.content) ? (
              article.content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p>{article.content}</p>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ArticlePage;