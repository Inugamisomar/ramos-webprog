import { NavLink, Link } from "react-router-dom";
import myLogo from "../assets/liogaming.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
    isActive
      ? "bg-white text-black shadow-md"
      : "text-zinc-400 hover:text-white hover:bg-zinc-800",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src={myLogo}
            alt="Leo Gaming Logo"
            className="h-12 w-auto transition-transform group-hover:scale-105"
          />

          <div className="space-y-0.5">
            <p className="text-xl font-black tracking-tight text-white">
              LEO<span className="text-zinc-500 font-light">GAMING</span>
            </p>
          </div>
        </NavLink>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4">
          
          <nav className="hidden items-center gap-2 md:flex bg-zinc-900 p-1 rounded-full border border-zinc-800">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* AUTH BUTTONS (Enhancement 3) */}
          <div className="hidden md:flex items-center gap-2 ml-2">

            <Link
              to="/auth/signin"
              className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-teal-400 text-black hover:bg-zinc-700 transition"
            >
              Log In
            </Link>

            <Link
              to="/auth/signup"
              className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-teal-400 text-black hover:bg-zinc-700 transition"
            >
              Sign Up
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};

export default NavBar;