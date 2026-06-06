import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="flex h-full flex-col rounded-3xl border border-teal-900/30 bg-[#0b2a30] p-4 shadow-[0_0_20px_rgba(20,184,166,0.15)] transition hover:shadow-[0_0_25px_rgba(20,184,166,0.3)]"
        >
          {/* IMAGE */}
          {article.image && (
            <div className="overflow-hidden rounded-xl bg-[#081f24]">
              <img
                src={article.image}
                alt={article.title}
                className="h-40 w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="flex flex-grow flex-col">
            {/* META */}
          <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.18em] text-teal-400">
                ARTICLE {String(index + 1).padStart(2, "0")}
            </p>

            {/* TITLE */}
              <h3 className="mt-2 text-[15px] font-medium text-slate-100 leading-7">              
                {article.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="mt-2 text-[14px] font-normal text-slate-300 leading-6">              
              {article.preview?.substring(0, 60)}...
            </p>

            {/* BUTTON */}
            <div className="mt-auto">
              <Link
                to={`/articles/${
                  article.slug ||
                  article.title?.toLowerCase().replace(/\s+/g, "-")
                }`}
              >
                <button className="mt-4 w-full rounded-full bg-teal-400 py-2 text-[13px] font-medium tracking-[0.15em] text-black transition hover:bg-teal-300">                  READ MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
