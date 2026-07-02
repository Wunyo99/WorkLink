import { useState, useContext } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVissible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    const email = data.email;
    const password = data.password;

    try {
      await handleLogin(email, password);
      toast.success("Logged In");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <div className=" py-10 px-4">
        <div className="max-w-xl lg:w-1/3 mx-auto mt-10 border border-gray-300 rounded-xl bg-white shadow-2xl py-5 px-10 ">
          <div className="mb-5">
            <p className="text-5xl text-gray-800 font-bold">Login</p>
            <div className="w-14 h-1 bg-purple-800"></div>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-800 font-medium">Email</label>
              <input
                className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            <div className="relative flex flex-col gap-2 mt-4">
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

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full justify-center px-10 py-2 text-white bg-purple-800 font-semibold text-lg rounded-lg mt-5  hover:scale-99 duration-300 ${isLoggingIn ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoggingIn ? (
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold">
                Don't have an account?{" "}
                <span className="text-purple-800 font-semibold">
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
