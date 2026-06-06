import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-lg border border-teal-600 bg-[#061a1d] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "Male",
    role: "viewer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    console.log("FORM DATA:", formData);

    try {
      const data = await UserService.register({
        ...formData,
        age: Number(formData.age),
      });

      console.log("REGISTERED:", data);
      setSuccess("Account created successfully!");
      setError("");

      setTimeout(() => {
        navigate("/auth/signin");
      }, 2000);

      navigate("/auth/signin");
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );

      setSuccess("");
    }
  };

  return (
    <>
      {/* TITLE */}
      <div className="text-center">
        <h1 className="text-3xl font-bold !text-white">Create Account</h1>

        <p className="mt-2 text-sm text-white-400">
          Join the arena. Start your journey.
        </p>
      </div>

      {/* FORM */}
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-teal-400">First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              required
              className={inputClasses}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-teal-400">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              required
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* USERNAME */}
        <div>
          <label className="text-sm text-teal-400">Username</label>

          <input
            type="text"
            name="username"
            value={formData.username}
            required
            className={inputClasses}
            onChange={handleChange}
          />
        </div>

        {/* AGE */}
        <div>
          <label className="text-sm text-teal-400">Age</label>

          <input
            type="number"
            name="age"
            value={formData.age}
            required
            className={inputClasses}
            onChange={handleChange}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-teal-400">Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            required
            className={inputClasses}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-teal-400">Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            required
            className={inputClasses}
            onChange={handleChange}
          />

          <p className="mt-2 text-xs text-white">
            Minimum 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-sm text-teal-400">Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            required
            className={inputClasses}
            onChange={handleChange}
          />
        </div>

        {/* GENDER */}
        <div>
          <label className="text-sm text-teal-400">Gender</label>

          <select
            name="gender"
            value={formData.gender}
            required
            className={inputClasses}
            onChange={handleChange}
          >
            <option value="Male">Male</option>

            <option value="Female">Female</option>
          </select>
        </div>

        {/* BUTTON */}
        {/* ERROR */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {/* SUCCESS */}
        {success && (
          <p className="text-green-400 text-sm text-center">{success}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 py-3 font-bold tracking-widest text-black transition hover:opacity-90"
        >
          CREATE ACCOUNT
        </button>

        {/* SOCIAL */}
        <div className="text-center text-xs text-zinc-500">OR</div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-lg bg-teal-400 py-3 font-bold text-black transition hover:bg-zinc-700"
          >
            GOOGLE
          </button>

          <button
            type="button"
            className="rounded-lg bg-teal-400 py-3 font-bold text-black transition hover:bg-zinc-700"
          >
            APPLE
          </button>
        </div>
      </form>

      {/* LINK */}
      <p className="mt-6 text-center text-sm text-white">
        Already have an account?{" "}
        <Link to="/auth/signin" className="font-semibold text-teal-400">
          Log in
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;
