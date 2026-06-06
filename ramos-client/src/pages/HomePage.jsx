import Button from "../components/Button";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-gradient-to-br from-[#071e22] via-[#0b2a30] to-[#071e22] text-white min-h-screen">

      {/* HERO SECTION */}
      <section className="border-y border-teal-500/20 bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div>
            <p className="mb-3 text-[21px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              Welcome Player One
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight !text-white sm:text-4xl">
              Your Ultimate Hub for Gaming News & Reviews
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
              Dive into the latest meta shifts, hardware drops, and honest reviews. Leo Gaming brings you front-row coverage of everything happening in the gaming world.
            </p>

            <div className="mt-6 flex gap-3">
              <Button to="/articles" variant="primary">Latest Drops</Button>
              <Button to="/about" variant="secondary">Meet the Team</Button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="rounded-3xl border border-teal-500/20 bg-[#081f24] p-2 overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
              alt="Gaming Setup"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

        </div>
      </section>

      {/* KPI SECTION */}
      <section className="border-y border-teal-500/20 bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        
        <div className="mb-6">
          <p className="text-[21px] font-semibold uppercase tracking-[0.28em] text-teal-400">
            Our Stats
          </p>

          <h2 className="mt-2 text-2xl font-semibold !text-white">
            Leveling Up Daily
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { num: "300+", label: "Games Reviewed" },
            { num: "50k", label: "Active Readers" },
            { num: "24/7", label: "Esports Coverage" },
            { num: "05", label: "Years Online" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-3xl border border-teal-500/20 bg-[#081f24] p-5"
            >
              <p className="text-2xl font-bold text-white">{stat.num}</p>

              <p className="mt-2 text-[21px] uppercase tracking-[0.24em] text-teal-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* FEATURES */}
      <section className="border-y border-teal-500/20 bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-6">
          <p className="text-[21px] uppercase tracking-[0.28em] text-teal-400">
            Content Hub
          </p>

          <h2 className="mt-2 text-2xl font-semibold !text-white">
            What We Cover
          </h2>
        </div>

      <div className="grid gap-6 md:grid-cols-3">
  {[
    {
      title: "Honest Game Reviews",
      desc: "From AAA to indie games, we review based on gameplay and performance.",
      img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    },
    {
      title: "Hardware & Tech",
      desc: "Check benchmarks before buying your next gaming setup.",
      img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5",
    },
    {
      title: "Esports Updates",
      desc: "Stay updated with tournaments and competitive gaming news.",
      img: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="rounded-5xl bg-[#0b2a30] border border-teal-900/30 p-5 
      shadow-[0_0_20px_rgba(20,184,166,0.15)]"
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-5 text-lg font-semibold text-white">
        {item.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
        {item.desc}
      </p>

      {/* BUTTON */}
      <Button
  to="/articles"
  variant="primary"
  className="mt-5 w-full"
>
  Explore
</Button>
    </div>
  ))}
</div>

      </section>
    </div>
  );
};

export default HomePage;