import { useState, useContext } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { jobs } from "../data/jobs";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVissible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVissible] = useState(false);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { handleSignUp } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    const {
      firstname,
      lastname,
      email,
      phone,
      job,
      password,
      confirmPassword,
    } = data;

    if (password !== data.confirmPassword) {
      setPasswordNotEqual(true);
      setIsSubmitting(false);
      return;
    }
    setPasswordNotEqual(false);

    try {
      await handleSignUp(firstname, lastname, email, phone, job, password);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else {
        toast.error("Resgistration failed!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="py-10 px-4">
        <div className="max-w-xl lg:w-2/3 mx-auto mt-2 border border-gray-300 rounded-xl bg-white shadow-2xl py-5 px-5">
          <div className="mb-5">
            <p className="text-5xl text-gray-800 font-bold">Register</p>
            <div className="w-14 h-1 bg-purple-500"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-800 font-medium">
                  First Name
                </label>
                <input
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  type="text"
                  name="firstname"
                  placeholder="John"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-800 font-medium">
                  Last Name
                </label>
                <input
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  type="text"
                  name="lastname"
                  placeholder="Doe"
                  required
                />{" "}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-800 font-medium">
                  Email
                </label>
                <input
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  type="email"
                  name="email"
                  placeholder="johndode@gmail.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-800 font-medium">
                  Phone
                </label>
                <input
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  type="text"
                  name="phone"
                  placeholder="XXXXXXXXXX"
                  required
                />{" "}
              </div>
            </div>
            <div className="mt-4">
              <select
                className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg mt-1"
                name="job"
                required
              >
                <option value="">Select a job</option>

                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="relative flex flex-col gap-2">
                <label className="text-sm text-gray-800 font-medium">
                  Password
                </label>
                <input
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVissible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <Eye
                      className="absolute top-11 inset-e-2.5 text-gray-500"
                      size={18}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute top-11 inset-e-2.5 text-gray-500"
                      size={18}
                    />
                  )}
                </button>
              </div>
              <div className="relative flex flex-col gap-2">
                <label className="text-sm text-gray-800 font-medium">
                  Confirm Password
                </label>
                <input
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  type={isConfPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  required
                />{" "}
                <button
                  type="button"
                  onClick={() =>
                    setIsConfPasswordVissible(!isConfPasswordVisible)
                  }
                >
                  {isConfPasswordVisible ? (
                    <Eye
                      className="absolute top-11 inset-e-2.5 text-gray-500"
                      size={18}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute top-11 inset-e-2.5 text-gray-500"
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full justify-center px-10 py-2 text-white bg-purple-500 font-semibold text-lg rounded-lg mt-5  hover:scale-99 duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  {" "}
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold">
                Already have an account?{" "}
                <span className="text-purple-500 font-semibold">
                  <a href="/login">Login</a>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
