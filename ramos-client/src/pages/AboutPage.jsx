import Button from "../components/Button";

import myProfilePic from "../assets/LEO GAMING (1).png";
import setupPic1 from "../assets/league.jpg";
import setupPic2 from "../assets/valor.jpg";
import setupPic3 from "../assets/mlbb.jpg";
import setupPic4 from "../assets/Tekken.png";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 
    bg-gradient-to-br from-[#071e22] via-[#0b2a30] to-[#071e22] 
    text-white min-h-screen">

      {/* PROFILE */}
      <section className="border-y border-teal-500/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* IMAGE */}
          <div className="rounded-3xl border border-teal-900/30 bg-[#081f24] p-6">
            <div className="flex min-h-72 items-center justify-center rounded-2xl overflow-hidden border border-teal-900/30 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
              <img
                src={myProfilePic}
                alt="Leovik Ramos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <p className="mb-3 text-[21px] uppercase tracking-[0.28em] text-teal-400">
              Player Profile
            </p>

            <h1 className="max-w-xl text-3xl font-bold !text-white leading-tight sm:text-4xl">
              Meet Leovik Ramos, the gamer behind the screen.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
              What started as a hobby of breaking down patch notes has turned into
              a full-time obsession. Leo Gaming is built on the idea that gamers
              deserve honest, fluff-free content.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/">Back to Home</Button>
              <Button to="/articles" className="border-teal-400 text-black">
                Read My Reviews
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-teal-500/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-6">
          <p className="text-[22px] uppercase tracking-[.28em] text-teal-400">
            Player Stats
          </p>

          <h2 className="mt-2 text-2xl !text-white font-semibold">
            Lifetime Achievements
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Hours Played", val: "10k+" },
            { label: "Games 100%", val: "45" },
            { label: "Articles Written", val: "312" },
            { label: "Energy Drinks", val: "Too Many" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-teal-900/30 bg-[#081f24] p-5"
            >
              <p className="text-2xl font-bold">{item.val}</p>

              <p className="mt-2 text-[21px] uppercase tracking-[0.24em] text-teal-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION + SETUP */}
      <section className="border-y border-teal-500/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* MISSION */}
          <div>
            <p className="text-[22px] uppercase tracking-[0.28em] text-teal-400">
              The Mission
            </p>

            <h2 className="mt-2 text-2xl !text-white font-semibold">
              Why Leo Gaming Exists
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border border-teal-900/30 bg-[#081f24] p-5">
                <h3 className="text-lg font-semibold">No Paid Bias</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-6">
                  We don't inflate review scores. If a game runs poorly or has
                  predatory systems, we call it out.
                </p>
              </article>

              <article className="rounded-3xl border border-teal-900/30 bg-[#081f24] p-5">
                <h3 className="text-lg font-semibold">Community First</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-6">
                  Built for players. We listen, engage, and let the community
                  influence what we cover next.
                </p>
              </article>
            </div>
          </div>

          {/* SETUP */}
          <div className="rounded-3xl border border-teal-900/30 bg-[#081f24] p-5">

            <p className="text-[22px] uppercase tracking-[0.28em] text-teal-400">
              The Battlestation
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[setupPic1, setupPic2, setupPic3, setupPic4].map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden border border-teal-900/30"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <Button className="mt-5 w-full">
              Join the Discord
            </Button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;