import { Link } from "react-router-dom";

const Button = ({ children, to, variant = "primary", className = "", ...props }) => {
  
  const base =
  "inline-flex items-center justify-center rounded-full px-10 py-4 text-[15px] font-semibold uppercase tracking-[0.2em] transition-all duration-300";

  const variants = {
  primary:
  "border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black hover:scale-105",

  secondary:
    "border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black hover:scale-105",

  outline:
    "border border-zinc-600 text-white hover:bg-zinc-800 hover:scale-105",
};

  const styles = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;