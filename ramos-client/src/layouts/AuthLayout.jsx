import { Outlet } from "react-router-dom";
import authbg from "../assets/authbg.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#071e22] text-white flex items-center justify-center px-6">
      {/* CARD CONTAINER */}
      <div className="w-full max-w-6xl rounded-2xl border border-teal-900/40 shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE (IMAGE BACKGROUND) */}
        <div className="relative hidden lg:flex flex-col items-center justify-center p-12">
          {/* BACKGROUND IMAGE */}
          <img
            src={authbg}
            alt="Gaming Background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* CONTENT */}
          <div className="relative text-center">
            <div className="text-7xl mb-4">🎮</div>

            <h1 className="text-8xl font-bold tracking-wide text-white !text-teal-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              LEO GAMING
            </h1>

            <p className="text-3xl  text-teal-300 tracking-widest">
              LEVEL UP YOUR SKILL,
              <br />
              MASTER THE GAME.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#081f24] p-8 sm:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
