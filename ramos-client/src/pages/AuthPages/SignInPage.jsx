import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/login";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-lg border border-cyan-400/30 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-1 focus:ring-cyan-400 placeholder:text-zinc-500";

const actionButtonClassName =
  "w-full rounded-lg py-3 text-sm font-bold tracking-widest bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white";
const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      setError("");

      // ADMIN
      if (data.user.role === "admin") {
        navigate("/dashboard/users");
      }

      // EDITOR
      else if (data.user.role === "editor") {
        navigate("/dashboard/articles");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
    
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold !text-white">PLAYER LOGIN</h1>

        <p className="mt-2 text-sm text-white-400">
          Level up your access. Enter the system.
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-zinc-900/80 backdrop-blur p-6 shadow-xl shadow-cyan-500/10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-300">
              username
            </label>

            <input
              type="username"
              name="username"
              placeholder="username"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-400 text-sm ml-1 -mt-3">{error}</p>}

          {/* Options */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-cyan-400" />
              Remember me
            </label>

            <button className="hover:text-cyan-300 transition">Forgot?</button>
          </div>
          

          {/* Login Button */}
          
          <Button type="submit" className={actionButtonClassName}>
            LOGIN
          </Button>

          {/* Divider */}
          <div className="text-center text-3x3 text-zinc-500">OR</div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              className="bg-teal-400 text-white border border-cyan-400/20 hover:bg-blue-400"
            >
              Google
            </Button>

            <Button
              type="button"
              className="bg-teal-400 text-white border border-teal-400/20 hover:bg-blue-400"
            >
              Apple
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-zinc-400">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="text-cyan-300 hover:text-cyan-200 font-semibold"
        >
          Create Account
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
